//Made by Vital
SCRIPT_START
SCRIPT_NAME MOUSCTR

{
    LVAR_INT player_actor mouse_look invert_y
    LVAR_FLOAT mouse_x mouse_y

    // Memory addresses
    CONST_INT STEER_WITH_MOUSE, 0xC1CC02
    CONST_INT FLY_WITH_MOUSE, 0xC1CC03
    CONST_INT BUTTON_ADDRESS, 0xB73458
    CONST_INT NORMAL_MOUSE_Y, 0xBA6745

    GET_PLAYER_CHAR 0 player_actor

    main_loop:
    WAIT 0

        IF IS_PLAYER_PLAYING 0
            IF IS_CHAR_IN_ANY_CAR player_actor
            mouse_look = BUTTON_ADDRESS
            mouse_look += 0x2C
            READ_MEMORY mouse_look 2 0 mouse_look

                // Invert Y axis for some types of transport
                IF IS_INT_LVAR_EQUAL_TO_NUMBER mouse_look 0
                WRITE_MEMORY NORMAL_MOUSE_Y 1 0 0
                ELSE
                WRITE_MEMORY NORMAL_MOUSE_Y 1 1 0
                ENDIF

                // Mouse driving & flying
                IF IS_INT_LVAR_EQUAL_TO_NUMBER mouse_look 0
                    IF NOT IS_CHAR_IN_FLYING_VEHICLE player_actor
                    // Steering
                    GET_PC_MOUSE_MOVEMENT mouse_x mouse_y
                        IF NOT IS_FLOAT_LVAR_EQUAL_TO_NUMBER mouse_x .0
                        OR NOT IS_FLOAT_LVAR_EQUAL_TO_NUMBER mouse_y .0
                        WRITE_MEMORY STEER_WITH_MOUSE 1 1 0
                        ELSE
                        WRITE_MEMORY STEER_WITH_MOUSE 1 0 0
                        ENDIF
                    ELSE
                    // Flying
                    GET_PC_MOUSE_MOVEMENT mouse_x mouse_y
                        IF NOT IS_FLOAT_LVAR_EQUAL_TO_NUMBER mouse_x .0
                        OR NOT IS_FLOAT_LVAR_EQUAL_TO_NUMBER mouse_y .0
                        OR IS_CHAR_IN_ANY_HELI player_actor
                        WRITE_MEMORY FLY_WITH_MOUSE 1 1 0
                        ELSE
                        WRITE_MEMORY FLY_WITH_MOUSE 1 0 0
                        ENDIF
                    ENDIF
                ENDIF
            ELSE
            // Disable mouse Y inverting on foot
            READ_MEMORY NORMAL_MOUSE_Y 1 0 invert_y
                IF NOT IS_INT_LVAR_EQUAL_TO_NUMBER invert_y 1
                WRITE_MEMORY NORMAL_MOUSE_Y 1 1 0
                ENDIF
            ENDIF
        ENDIF

    GOTO main_loop
}

SCRIPT_END