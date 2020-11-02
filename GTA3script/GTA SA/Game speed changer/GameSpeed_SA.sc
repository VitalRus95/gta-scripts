//Made by Vital
SCRIPT_START
SCRIPT_NAME GAMESPD

{
    main_loop:
    WAIT 0

        IF IS_PLAYER_PLAYING 0

            IF IS_KEY_PRESSED (VK_OEM_PLUS)
            CLEO_CALL game_speed_change (0) 187 0.1
            ELSE
                IF IS_KEY_PRESSED (VK_OEM_MINUS)
                CLEO_CALL game_speed_change (0) 189 -0.1
                ELSE
                    IF IS_KEY_PRESSED (VK_BACK)
                    WRITE_MEMORY 0xB7CB64 4 1.0 0 //restore default (1.0)
                    CLEAR_SMALL_PRINTS
                    PRINT_HELP_STRING "Default game speed"

                        WHILE IS_KEY_PRESSED (VK_BACK)
                        WAIT 0
                        ENDWHILE

                    ENDIF
                ENDIF
            ENDIF

        ENDIF

    GOTO main_loop
}

{
    LVAR_INT key
    LVAR_FLOAT change_value speed

    game_speed_change:
    READ_MEMORY 0xB7CB64 4 0 speed
    speed += change_value
    WRITE_MEMORY 0xB7CB64 4 speed 0
    PRINT_FORMATTED "Game speed: %.1f" 2500 speed
    TIMERA = 0

        WHILE IS_KEY_PRESSED key
        AND TIMERA < 249
        WAIT 0
        ENDWHILE

    CLEO_RETURN 0
}

SCRIPT_END