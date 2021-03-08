//Made by Vital
SCRIPT_START
SCRIPT_NAME FIRPROP

{
    LVAR_INT current_address address_copy explosion_counter explosion_type propagation_chance player_actor
    LVAR_FLOAT x y z ground_z x_r y_r

    GET_PLAYER_CHAR 0 player_actor

    main_loop:
    WAIT 0

        IF IS_PLAYER_PLAYING 0
        current_address = 0x780C88 // Start of explosions array

            WHILE NOT IS_INT_LVAR_GREATER_THAN_NUMBER current_address 0x7816D0 // Array end
            READ_MEMORY current_address 4 0 explosion_type

                // Flamethrower fire
                IF IS_CURRENT_PLAYER_WEAPON 0 WEAPONTYPE_FLAMETHROWER
                AND IS_PLAYER_SHOOTING 0
                    IF IS_INT_LVAR_GREATER_THAN_NUMBER TIMERA 699
                    TIMERA = 0
                    GET_OFFSET_FROM_CHAR_IN_WORLD_COORDS player_actor .0 9.0 .0 x y z
                        IF CLEO_CALL check_z (0) x y z 9.0
                        GET_GROUND_Z_FOR_3D_COORD x y z ground_z
                        ADD_EXPLOSION_NO_SOUND x y ground_z EXPLOSION_MOLOTOV
                        ENDIF
                    ENDIF
                ELSE
                    IF IS_INT_LVAR_GREATER_THAN_NUMBER TIMERA 0
                    TIMERA --
                    ENDIF
                ENDIF // Flamethrower fire

                // Fire propagation
                IF IS_INT_LVAR_EQUAL_TO_NUMBER explosion_type 1 // Molotov
                GENERATE_RANDOM_INT_IN_RANGE 0 5 propagation_chance
                    IF IS_INT_LVAR_EQUAL_TO_NUMBER propagation_chance 0
                    address_copy = current_address
                    address_copy += 0x24 // Counter
                    READ_MEMORY address_copy 1 0 explosion_counter

                        IF IS_INT_LVAR_GREATER_THAN_NUMBER explosion_counter 76
                        AND NOT IS_INT_LVAR_GREATER_THAN_NUMBER explosion_counter 80
                        address_copy = current_address
                        address_copy += 0x04 // Coordinates

                        READ_MEMORY address_copy 4 0 x
                        address_copy += 4
                        READ_MEMORY address_copy 4 0 y
                        address_copy += 4
                        READ_MEMORY address_copy 4 0 z

                        GENERATE_RANDOM_FLOAT_IN_RANGE -5.0 5.0 x_r
                        GENERATE_RANDOM_FLOAT_IN_RANGE -5.0 5.0 y_r
                        ADD_FLOAT_LVAR_TO_FLOAT_LVAR x x_r
                        ADD_FLOAT_LVAR_TO_FLOAT_LVAR y y_r

                            IF CLEO_CALL check_z (0) x y z 5.0
                            GET_GROUND_Z_FOR_3D_COORD x y z ground_z
                            ADD_EXPLOSION_NO_SOUND x y ground_z EXPLOSION_MOLOTOV
                            ENDIF
                        ENDIF
                    ENDIF
                ENDIF // Fire propagation

            current_address += 0x38 // Size of one element
            ENDWHILE
        ENDIF

    GOTO main_loop
}

{
    LVAR_FLOAT x y z max
    LVAR_FLOAT ground_z

    check_z:
    GET_GROUND_Z_FOR_3D_COORD x y z ground_z
    ground_z -= z
    ABS_LVAR_FLOAT ground_z
        IF NOT IS_FLOAT_LVAR_GREATER_THAN_FLOAT_LVAR ground_z max
        ENDIF
    CLEO_RETURN (0)
}

SCRIPT_END