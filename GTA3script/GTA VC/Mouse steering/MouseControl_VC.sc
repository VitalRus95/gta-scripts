//Made by Vital
SCRIPT_START
SCRIPT_NAME MOUSCTR

{
    LVAR_FLOAT mouse_x mouse_y
    LVAR_INT int_mouse_x int_mouse_y maximum_x maximum_y
    LVAR_INT rmb_flag wheel_up wheel_down

    main_loop:
    WAIT 0

        IF IS_PLAYER_PLAYING 0
        AND IS_PLAYER_IN_ANY_CAR 0
        // Working with X axis
        READ_MEMORY 0x936910 4 0 mouse_x

            IF IS_FLOAT_LVAR_GREATER_THAN_NUMBER mouse_x 10.0
            OR NOT IS_FLOAT_LVAR_GREATER_THAN_NUMBER mouse_x -10.0
                IF IS_PLAYER_IN_ANY_HELI 0
                AND NOT IS_FLOAT_LVAR_GREATER_THAN_NUMBER mouse_x 20.0
                AND IS_FLOAT_LVAR_GREATER_THAN_NUMBER mouse_x -20.0
                mouse_x *= 0.5
                ELSE
                mouse_x *= 1.8
                ENDIF

                IF IS_FLOAT_LVAR_GREATER_THAN_NUMBER mouse_x 255.0
                mouse_x = 255.0
                ELSE
                    IF NOT IS_FLOAT_LVAR_GREATER_THAN_NUMBER mouse_x -255.0
                    mouse_x = -255.0
                    ENDIF
                ENDIF
            CSET_LVAR_INT_TO_LVAR_FLOAT maximum_x mouse_x
            ENDIF

        // Working with Y axis        
        READ_MEMORY 0x936914 4 0 mouse_y

            IF IS_FLOAT_LVAR_GREATER_THAN_NUMBER mouse_y 10.0
            OR NOT IS_FLOAT_LVAR_GREATER_THAN_NUMBER mouse_y -10.0
                IF IS_PLAYER_IN_ANY_HELI 0
                mouse_y *= -2.9
                ELSE
                mouse_y *= -2.5
                ENDIF

                IF IS_FLOAT_LVAR_GREATER_THAN_NUMBER mouse_y 255.0
                mouse_y = 255.0
                ELSE
                    IF NOT IS_FLOAT_LVAR_GREATER_THAN_NUMBER mouse_y -255.0
                    mouse_y = -255.0
                    ENDIF
                ENDIF
            CSET_LVAR_INT_TO_LVAR_FLOAT maximum_y mouse_y
            ENDIF

        CSET_LVAR_INT_TO_LVAR_FLOAT int_mouse_x mouse_x
        CSET_LVAR_INT_TO_LVAR_FLOAT int_mouse_y mouse_y
        
        // Turn lock, helicopter controls, tank's and firetruck's aiming, Vodoo's jumping
        READ_MEMORY 0x936909 1 0 rmb_flag

            // Hold RMB or fly a helicopter to lock turning (like turning assist)
            IF NOT IS_INT_LVAR_EQUAL_TO_NUMBER rmb_flag 0
            OR IS_PLAYER_IN_ANY_HELI 0
                // No lock in firetruct and tank to prevent automatic cannon rotation
                IF NOT IS_PLAYER_IN_MODEL 0 RHINO
                AND NOT IS_PLAYER_IN_MODEL 0 FIRETRUK
                int_mouse_x = maximum_x
                int_mouse_y = maximum_y
                ENDIF
            ENDIF

            // Firetruck's cannon aiming or general mouse steering
            IF IS_INT_LVAR_EQUAL_TO_NUMBER rmb_flag 0
                IF IS_PLAYER_IN_MODEL 0 FIRETRUK
                AND IS_IN_CAR_FIRE_BUTTON_PRESSED
                int_mouse_y *= -1
                EMULATE_BUTTON_PRESS_WITH_SENSITIVITY RIGHTSTICKX int_mouse_x
                EMULATE_BUTTON_PRESS_WITH_SENSITIVITY RIGHTSTICKY int_mouse_y
                ELSE
                EMULATE_BUTTON_PRESS_WITH_SENSITIVITY LEFTSTICKX int_mouse_x
                EMULATE_BUTTON_PRESS_WITH_SENSITIVITY LEFTSTICKY int_mouse_y
                ENDIF
            ELSE // Tank's cannon aiming, Vodoo's jumping, helicopter Z-axis rotation
                IF IS_PLAYER_IN_MODEL 0 RHINO
                OR IS_PLAYER_IN_MODEL 0 VOODOO
                OR IS_PLAYER_IN_ANY_HELI 0
                int_mouse_y *= -1 
                EMULATE_BUTTON_PRESS_WITH_SENSITIVITY RIGHTSTICKX int_mouse_x
                EMULATE_BUTTON_PRESS_WITH_SENSITIVITY RIGHTSTICKY int_mouse_y
                ELSE
                EMULATE_BUTTON_PRESS_WITH_SENSITIVITY LEFTSTICKX int_mouse_x
                EMULATE_BUTTON_PRESS_WITH_SENSITIVITY LEFTSTICKY int_mouse_y
                ENDIF
            ENDIF
        //PRINT_FORMATTED_NOW "X: %.2f - %i Y: %.2f - %i RMB: %i" 100 mouse_x maximum_x mouse_y maximum_y rmb_flag
        ENDIF

    GOTO main_loop
}

SCRIPT_END