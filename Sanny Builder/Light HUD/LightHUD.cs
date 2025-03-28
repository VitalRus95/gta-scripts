�	LGT_HUD �
V�X � �
��X � �
��X � �
��X � �
��X � �
��X � �
��X � �
p�X � �   �
     �
ig�   �
�D�   �
e�   � 9  9   9   V� kM ��� p����	 ��
i���   �
����   �
D���   �
����   �
����   �
����   �
����   �
{���   �
;���   �
���     � �     �M p���     v���&   �   �
v���       0C      0C    �B�
G��� @D  �C2  �  �
���  @D  �C�   �  �
  �
  �   �  )� M �����
  �   �
v���       �B      �B    �B�
G��� @D  �C�  �
���  @D  �C� � � �  �
  �
  �  e�  M /����
  �   �
�ͷ       �C�     M ����     A�
v���      �%E      �B   �%E�
G��� @D <�  �
���  @D  � � �  �
  �
  �  K�  M k����
  �
�ͷ   �  1�     M C����
  �       �C�     M ���     A�  e	  M ����     A�
v���     ��DE      �B  ��DE�
G��� @D  �  �
���  @D � �  �  �
  �
  �  ߀  M s����
  �
L��   �  9   M N����
  �   A  �
  '    �
����  �   �
  �
����  �   I?   ?ff�?@ � �      B>  �C  B �
  �
  �	   �  9   M n����      C     f���K	   � �   �  M A���  �  :���  I ?333?��,@@� � �      �>  D ��C �
  �
  �   �    	M ����� 	TIME     ����� 	TIME_0  � �   �  M ����  �  ����  dI?ff�>33�?@� � �      B[  �C  �@   �
  �
    �  9   M ����
  � �   �  M ����  �  ����  d�     M ����@d� d  ����@� � �  I?ff�>33�?    �Z  D  �@	DOLLAR   �
  �
  �
   �
  �
   � )� 9  
9  9  M 0����
    �  9   M ���    �@ ����    �A  �
 � Z   
  �
   
  �
   b   � �   �  M ����  �  ����  xI?ff�>33�?@� � �      ��  )� 'M &���[  D 	TIME       ���Z  D 	NUMBER   �
  �
  �  �  )� M �����
  � �  �  M ����  �  ����  F�     �M ����@� dd  ����@dd�  I?   ?ff@   � BZ �D  �C	NUMBER   �
  �
  �     �B  �@    �
  �
  �  1�    �BM �����        �B     �[   �      �@    �
  �
  �  -�   M �����     �����     M �����   �
  �
  �  5�   M T����     9����  %   M 9����   �
  �
  FLAG   SRC 7&  {$CLEO} //  Script by Vital (Vitaly Pavlovich Ulyanov)
script_name 'LGT_HUD'

// Turn off the standard HUD in memory to preserve toggling it in scripts
Memory.Write(0x58B156, 5, 0x90, true) // CHud::DrawVehicleName (I'm stupid so I'll just NOP drawing)
Memory.Write(0x5893B0, 1, 0xC3, true) // CHud::DrawAmmo
Memory.Write(0x58EAF0, 1, 0xC3, true) // CHud::DrawPlayerInfo
Memory.Write(0x58D9A0, 1, 0xC3, true) // CHud::DrawWanted
Memory.Write(0x58D7D0, 1, 0xC3, true) // CHud::DrawWeaponIcon
Memory.Write(0x5890A0, 1, 0xC3, true) // CHud::RenderArmorBar
Memory.Write(0x589190, 1, 0xC3, true) // CHud::RenderBreathBar
Memory.Write(0x589270, 1, 0xC3, true) // CHud::RenderHealthBar

const
    BAR_HEIGHT = 5.0
    BAR_WIDTH = 74.0
    BAR_OUTLINE_HEIGHT = 7.0
    BAR_OUTLINE_WIDTH = 76.0
end // const

Char plc = Player.GetChar(0)
int plp = Memory.GetPedPointer(plc)
int hud_in_menu, hud_in_script, cutscene_on

while true
    wait 0

    hud_in_menu = Memory.Read(0xBA6769, 1, false)
    hud_in_script = Memory.Read(0xA444A0, 1, false)
    cutscene_on = Memory.Read(0xB6F065, 1, false)

    if or
        cutscene_on == true
        hud_in_menu == false
        hud_in_script == false
        not Player.IsPlaying(0)
        Camera.GetFadingStatus()
    then
        continue
    end // if

    Hud.DisplayZoneNames(false)
    Text.UseCommands(true)

    DrawHealth(plc)
    DrawArmour(plc)
    DrawOxygen(plc)
    DrawSprint(plc)
    DrawCarName(plc)
    DrawZone(plc)
    DrawTime(plc)
    DrawAmmo(plc)
    DrawMoney(plc)
    DrawWanted(timera, plc)

    Text.UseCommands(false)

    if
        timera > 2999
    then
        timera = 0
    end // if
end // while

// --- Drawing HUD ---
function DrawHealth(plc: Char)
    int health = plc.GetHealth()
    float f_health =# health

    const MAX = 176.0
    f_health = ClampFloat(0.0, f_health, MAX)
    f_health /= MAX
    f_health *= BAR_WIDTH

    DrawOutline(585.0, 390.0, 50, 0, 0, 150)
    DrawBar(f_health, 585.0, 390.0, 255, 0, 0, 200)

    cleo_return 0
end

function DrawArmour(plc: Char)
    int armour = plc.GetArmor()

    if
        armour < 1
    then
        cleo_return 0
    end // if

    float f_armour =# armour
    const MAX = 100.0
    f_armour = ClampFloat(0.0, f_armour, MAX)
    f_armour *= BAR_WIDTH
    f_armour /= 100.0

    DrawOutline(585.0, 382.0, 20, 30, 30, 150)
    DrawBar(f_armour, 585.0, 382.0, 200, 235, 235, 200)

    cleo_return 0
end

function DrawOxygen(plc: Char)
    if
        not plc.IsSwimming()
    then
        cleo_return 0
    end // if

    int armour = plc.GetArmor()
    float oxygen = Memory.Read(0xB7CDE0, 4, false)
    float y = 382.0

    if
        armour > 0
    then
        y -= 8.0
    end // if

    const MAX = 2652.0
    oxygen = ClampFloat(0.0, oxygen, MAX)
    oxygen *= BAR_WIDTH
    oxygen /= MAX

    DrawOutline(585.0, y, 20, 20, 60, 150)
    DrawBar(oxygen, 585.0, y, 0, 255, 255, 200)

    cleo_return 0
end

function DrawSprint(plc: Char)
    if
        not plc.IsOnFoot()
    then
        cleo_return 0
    end // if

    float sprint = Memory.Read(0xB7CDB4, 4, false)

    if
        sprint < 0.0
    then
        cleo_return 0
    end

    int armour = plc.GetArmor()
    float y = 382.0

    if
        armour > 0
    then
        y -= 8.0
    end // if

    if
        plc.IsSwimming()
    then
        y -= 8.0
    end // if

    const MAX = 3150.54
    sprint = ClampFloat(0.0, sprint, MAX)
    sprint *= BAR_WIDTH
    sprint /= MAX

    DrawOutline(585.0, y, 30, 30, 0, 150)
    DrawBar(sprint, 585.0, y, 190, 190, 0, 200)

    cleo_return 0
end

function DrawCarName(plc: Char)
    if
        not plc.IsInAnyCar()
    then
        cleo_return 0
    end // if

    int fade_timer = Memory.Read(0xBAA44C, 4, false)

    if
        fade_timer == 0
    then
        cleo_return 0
    end // if

    Car veh = plc.StoreCarIsInNoSave()
    int model = veh.GetModel()
    int col, a
    string car_name = Streaming.GetNameOfVehicleModel(model)

    col = veh.GetHealth()
    col /= 3
    col = ClampInt(0, col, 255)

    a = fade_timer / 3
    a = ClampInt(0, a, 255)

    Text.SetFont(Font.Menu)
    Text.SetScale(0.5, 1.8)
    Text.SetColor(col, 150, 150, a)
    Text.SetEdge(1, 0, 0, 0, a)
    Text.SetCenter(true)
    Text.Display(320.0, 38.0, car_name)
    
    cleo_return 0
end

function DrawZone(plc: Char)
    int interior, a
    float x, y, z
    string zone_name

    interior = plc.GetAreaVisible()

    if
        interior == 0
    then
        x, y, z = plc.GetCoordinates()
        zone_name = get_name_of_zone x y z
    else
        zone_name = plc.GetNameOfEntryExitUsed()
    end // if

    if or
        plc.IsInAnyCar()
        Pad.IsButtonPressed(PadId.Pad1, Button.LeftShoulder1)
    then
        a = 180
    else
        a = 30
    end // if

    Text.SetFont(Font.Gothic)
    Text.SetScale(0.7, 2.7)
    Text.SetColor(235, 255, 190, a)
    Text.SetDropshadow(1, 0, 0, 0, a)
    Text.SetRightJustify(true)
    Text.Display(620.0, 395.0, zone_name)

    cleo_return 0
end

function DrawTime(plc: Char)
    int h, m, a
    string key

    h, m = Clock.GetTimeOfDay()

    if
        m > 9
    then
        key = 'TIME'
    else
        key = 'TIME_0'
    end // if

    if or
        plc.IsInAnyCar()
        Pad.IsButtonPressed(PadId.Pad1, Button.LeftShoulder1)
    then
        a = 200
    else
        a = 100
    end // if

    Text.SetFont(Font.Pricedown)
    Text.SetScale(0.45, 1.9)
    Text.SetColor(255, 175, 175, a)
    Text.SetDropshadow(1, 0, 0, 0, a)
    Text.SetCenter(true)
    Text.DisplayWith2Numbers(320.0, 5.0, key, h, m)

    cleo_return 0
end

function DrawMoney(plc: Char)
    int m = Player.StoreScore(0)

    if
        m == 0
    then
        cleo_return 0
    end // if

    int a

    if or
        plc.IsInAnyCar()
        Pad.IsButtonPressed(PadId.Pad1, Button.LeftShoulder1)
    then
        a = 200
    else
        a = 100
    end // if

    if m > 0
    then
        Text.SetColor(100, 255, 100, a)
    else
        Text.SetColor(180, 180, 180, a)
    end // if

    Text.SetFont(Font.Pricedown)
    Text.SetScale(0.45, 1.9)
    Text.SetDropshadow(1, 0, 0, 0, a)
    Text.SetRightJustify(true)
    Text.DisplayWithNumber(620.0, 5.0, 'DOLLAR', m)

    cleo_return 0
end

function DrawAmmo(plc: Char)
    int ammo_total, ammo_clip, plp, slot, weapon_struct, a

    plp = Memory.GetPedPointer(plc)
    slot = plp + 0x718
    slot = Memory.Read(slot, 1, false)

    if or
        slot < 2 // Melee
        slot == 10 // Gifts
        slot == 11 // Goggles or parachute
        slot == 12 // Detonator
    then
        cleo_return 0
    end // if

    int money = Player.StoreScore(0)
    float y

    if
        money == 0
    then
        y = 5.0
    else
        y = 25.0
    end // if

    slot *= 28 // 28 bytes per slot

    weapon_struct = plp + 0x5A0
    weapon_struct += slot
    weapon_struct += 8
    ammo_clip = Memory.Read(weapon_struct, 4, false)

    weapon_struct += 4
    ammo_total = Memory.Read(weapon_struct, 4, false)

    ammo_total -= ammo_clip

    if or
        plc.IsInAnyCar()
        Pad.IsButtonPressed(PadId.Pad1, Button.LeftShoulder1)
    then
        a = 200
    else
        a = 120
    end // if

    Text.SetFont(Font.Pricedown)
    Text.SetScale(0.45, 1.9)
    Text.SetColor(180, 180, 255, a)
    Text.SetDropshadow(1, 0, 0, 0, a)
    Text.SetRightJustify(true)

    if
        ammo_total < 9999
    then
        Text.DisplayWith2Numbers(620.0, y, 'TIME', ammo_clip, ammo_total)
    else
        Text.DisplayWithNumber(620.0, y, 'NUMBER', ammo_clip)
    end // if

    cleo_return 0
end

function DrawWanted(timer: int, plc: Char)
    int wl = Player.StoreWantedLevel(0)

    if
        wl < 1
    then
        cleo_return 0
    end // if

    int a

    if or
        plc.IsInAnyCar()
        Pad.IsButtonPressed(PadId.Pad1, Button.LeftShoulder1)
    then
        a = 200
    else
        a = 70
    end // if

    if timer > 1499
    then
        Text.SetColor(255, 100, 100, a)
    else
        Text.SetColor(100, 100, 255, a)
    end // if

    Text.SetFont(Font.Menu)
    Text.SetScale(0.5, 2.1)
    Text.SetDropshadow(1, 0, 0, 0, 150)
    Text.SetCenter(true)
    Text.DisplayWithNumber(535.0, 376.0, 'NUMBER', wl)

    cleo_return 0
end

// --- Drawing bar & outline ---
function DrawOutline(x: float, y: float, r: int, g: int, b: int, a: int)
    Hud.DrawRect(x, y, BAR_OUTLINE_WIDTH, BAR_OUTLINE_HEIGHT, r, g, b, a)
    cleo_return 0
end

function DrawBar(value: float, x: float, y: float, r: int, g: int, b: int, a: int)
    if
        value < BAR_WIDTH
    then
        float diff = value
        diff -= BAR_WIDTH
        diff /= -2.0
        x += diff
    end // if

    Hud.DrawRect(x, y, value, BAR_HEIGHT, r, g, b, a)
    cleo_return 0
end

// --- Additional functions ---
function ClampInt(min: int, value: int, max: int): int
    if
        value < min
    then
        value = min
    else
        if
            value > max
        then
            value = max
        end // if
    end // if

    cleo_return 1 value
end

function ClampFloat(min: float, value: float, max: float): float
    if
        value < min
    then
        value = min
    else
        if
            value > max
        then
            value = max
        end // if
    end // if

    cleo_return 1 value
end�
  __SBFTR 