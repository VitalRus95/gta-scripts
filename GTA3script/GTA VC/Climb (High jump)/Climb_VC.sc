//Made by Vital
SCRIPT_START
SCRIPT_NAME CLIMB

{
    LVAR_INT player_actor player_struct player_status
    LVAR_FLOAT velocity_z
    GET_PLAYER_CHAR 0 player_actor

    main_loop:
    WAIT 0

        IF IS_PLAYER_PLAYING 0
        AND IS_PLAYER_ON_FOOT 0
        GET_PED_POINTER player_actor player_struct
        player_struct += 0x244
        READ_MEMORY player_struct 4 0 player_status
            IF IS_INT_LVAR_EQUAL_TO_NUMBER player_status 0x29 // jumping
            AND IS_BUTTON_PRESSED PAD1 SQUARE // jump
                IF NOT IS_INT_LVAR_GREATER_THAN_NUMBER TIMERA 750
                GET_PED_POINTER player_actor player_struct
                player_struct += 0x078 // start at 0x070, skip to Z

                READ_MEMORY player_struct 4 0 velocity_z
                    IF IS_FLOAT_LVAR_GREATER_THAN_NUMBER velocity_z 0.0
                    AND NOT IS_FLOAT_LVAR_GREATER_THAN_NUMBER velocity_z 0.5
                    ADD_TIMED_VAL_TO_FLOAT_LVAR velocity_z 0.0055
                    WRITE_MEMORY player_struct 4 velocity_z 0
                    //PRINT_FORMATTED_NOW "Holding jump for %i ms" 500 TIMERA
                    ENDIF
                ENDIF
            ELSE
                IF NOT IS_BUTTON_PRESSED PAD1 SQUARE
                TIMERA = 0 
                ENDIF
            ENDIF
        ENDIF

    GOTO main_loop
}

SCRIPT_END