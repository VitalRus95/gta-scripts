//Made by Vital
SCRIPT_START
SCRIPT_NAME FIREEXP

{
    LVAR_INT current_address address_copy explosion_counter explosion_type
    LVAR_FLOAT x y z ground_z

    main_loop:
    WAIT 0

        IF IS_PLAYER_PLAYING 0
        current_address = 0x780C88 // Start of explosions array

            WHILE NOT IS_INT_LVAR_GREATER_THAN_NUMBER current_address 0x7816D0 // Array end
            READ_MEMORY current_address 4 0 explosion_type

                IF NOT IS_INT_LVAR_EQUAL_TO_NUMBER explosion_type 1 // Molotov
                AND NOT IS_INT_LVAR_EQUAL_TO_NUMBER explosion_type 0 // Grenade
                AND NOT IS_INT_LVAR_EQUAL_TO_NUMBER explosion_type 4 // Car quick
                AND NOT IS_INT_LVAR_EQUAL_TO_NUMBER explosion_type 5 // Boat
                AND NOT IS_INT_LVAR_EQUAL_TO_NUMBER explosion_type 8 // Mine
                AND NOT IS_INT_LVAR_EQUAL_TO_NUMBER explosion_type 9 // Barrel
                address_copy = current_address
                address_copy += 0x24 // Counter
                READ_MEMORY address_copy 1 0 explosion_counter

                    IF IS_INT_LVAR_GREATER_THAN_NUMBER explosion_counter 0
                    AND NOT IS_INT_LVAR_GREATER_THAN_NUMBER explosion_counter 1
                    address_copy = current_address
                    address_copy += 0x04 // Coordinates

                    READ_MEMORY address_copy 4 0 x
                    address_copy += 4
                    READ_MEMORY address_copy 4 0 y
                    address_copy += 4
                    READ_MEMORY address_copy 4 0 z

                    GET_GROUND_Z_FOR_3D_COORD x y z ground_z
                    ground_z -= z
                    ABS_LVAR_FLOAT ground_z

                        IF NOT IS_FLOAT_LVAR_GREATER_THAN_NUMBER ground_z 3.0
                            IF IS_PLAYER_IN_MODEL 0 RHINO
                            AND LOCATE_PLAYER_ANY_MEANS_3D 0 x y z 35.0 35.0 35.0 FALSE
                            ELSE
                            ADD_EXPLOSION_NO_SOUND x y z EXPLOSION_MOLOTOV
                            ENDIF
                        ENDIF
                    ENDIF
                ENDIF

            current_address += 0x38 // Size of one element
            ENDWHILE
        ENDIF

    GOTO main_loop
}

SCRIPT_END