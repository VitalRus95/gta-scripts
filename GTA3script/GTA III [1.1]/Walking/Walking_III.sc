//Made by Vital
SCRIPT_START
SCRIPT_NAME WALKING

{
    LVAR_INT button

    main_loop:
    WAIT 0

        IF IS_PLAYER_PLAYING 0
        AND IS_PLAYER_ON_FOOT 0
        AND CAN_PLAYER_START_MISSION 0
        AND IS_KEY_PRESSED VK_LMENU // Left Alt
            WHILE IS_KEY_PRESSED VK_LMENU
            WAIT 0
            ENDWHILE

            WHILE NOT IS_KEY_PRESSED VK_LMENU // Walking turned ON
            button = 8 // 8 - forward, 9 - backward, 10 - left, 11 - right

                WHILE NOT IS_INT_LVAR_GREATER_THAN_NUMBER button 11
                    IF IS_PLAYER_ON_FOOT 0
                    AND CAN_PLAYER_START_MISSION 0
                        IF IS_BUTTON_PRESSED_WITH_SENSITIVITY button 255
                        AND NOT IS_BUTTON_PRESSED PAD1 CROSS
                        EMULATE_BUTTON_PRESS_WITH_SENSITIVITY button 128
                        ENDIF
                    ENDIF
                button ++
                ENDWHILE

            WAIT 0
            ENDWHILE // Walking turned ON

            WHILE IS_KEY_PRESSED VK_LMENU
            WAIT 0
            ENDWHILE
        ENDIF

    GOTO main_loop
}

SCRIPT_END