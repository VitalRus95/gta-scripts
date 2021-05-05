//Made by Vital
SCRIPT_START
SCRIPT_NAME CARGREN

{
    LVAR_INT ammo car

    main_loop:
    WAIT 0

        IF IS_PLAYER_PLAYING 0
            IF IS_PLAYER_IN_ANY_CAR 0
            AND IS_BUTTON_PRESSED PAD1 CIRCLE
            AND NOT IS_BUTTON_PRESSED PAD1 LEFTSHOULDER2
            AND NOT IS_BUTTON_PRESSED PAD1 RIGHTSHOULDER2
                IF NOT IS_PLAYER_IN_MODEL 0 CAR_RHINO
                AND NOT IS_PLAYER_IN_MODEL 0 CAR_FIRETRUCK
                AND NOT IS_PLAYER_IN_MODEL 0 CAR_RCBANDIT
                AND NOT IS_PLAYER_IN_MODEL 0 BOAT_PREDATOR
                GET_AMMO_IN_PLAYER_WEAPON 0 WEAPONTYPE_GRENADE ammo
                STORE_CAR_PLAYER_IS_IN_NO_SAVE 0 car
                    IF IS_INT_LVAR_GREATER_THAN_NUMBER ammo 0
                    AND NOT IS_CAR_ARMED_WITH_ANY_BOMB car
                    ammo --
                    SET_PLAYER_AMMO 0 WEAPONTYPE_GRENADE ammo
                    ARM_CAR_WITH_BOMB car CARBOMB_TIMED
                    WAIT 0
                        IF NOT IS_CAR_DEAD car
                        ARM_CAR_WITH_BOMB car CARBOMB_TIMEDACTIVE
                        ENDIF
                    ENDIF
                ENDIF
            ENDIF
        ENDIF

    GOTO main_loop
}

SCRIPT_END