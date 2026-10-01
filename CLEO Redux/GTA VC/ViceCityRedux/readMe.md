# GTA: Vice City Redux

## ENGLISH

- **Author**: Vital (Vitaly Pavlovich Ulyanov).
- **Version**: 2 [2026-10-01].
- **Thanks for help to**: Seemann, Miran, Fix, ThirteenAG, Birds.
- **Description**: A pack of CLEO Redux scripts made to enhance and expand certain aspects of the game while preserving the original atmosphere as much as possible.
- **Requirements**: CLEO Redux v1.5.0 + CLEO 2.2.0 or newer, GTA: Vice City v1.0.
- **Installation**: Put `ScriptingKit` and `ViceCityRedux` in your `GTA Vice City\CLEO` directory.

## Scripts:

### Added in version 1 [2026-04-03]:

- **Toggle crosshair** (`crosshair.ts`): turn the crosshair ON and OFF by pressing `Target` button.
- **Drop weapon** (`dropWeapon.ts`): hold `Action` button to drop your current weapon. It will disappear after 20 seconds.
- **Dynamic FOV** (`dynamicFov.ts`): field of view (FOV) changes depending on your vehicle's speed or on-foot camera angle.
- **Hide HUD** (`hideHud.ts`): press `+` on your keyboard to toggle the HUD.
- **Simple climbing** (`higherJump.ts`): press `Jump` midair to ‘climb’ (essentially, jump a bit higher).
- **HUD tweaks** (`hudTweaks.ts`): minor HUD alterations, namely removing zeros in money and a different ammo display style.
- **Kill flash** (`killFlash.ts`): a brief screen flash on each kill.
- **Mouse steering** (`mouseControl.ts`): custom mouse steering for all vehicles. Press `Right mouse button` to toggle between regular (steering) and additional (turn left/right in helicopters; tank cannon rotation; water cannon rotation in firetruck; hydraulics in Voodoo) modes.
- **No splash screens** (`noSplashScreens.ts`): removes splash screens between the islands.
- **Pyromaniac** (`pyromaniac.ts`): adds fiery vehicle explosions, fire propagation, flamethrower setting ground on fire when fired continuously, and minor visual effects for explosions.
- **Random gang weapons** (`randomGangWeapons.ts`): randomises gangs' weapons at random intervals.
- **Weapon recoil** (`recoil.ts`): adds recoil to weapons, shifting the crosshair's position based on the weapon's type.
- **Regeneration** (`regeneration.ts`): health regenerates up to 50%.
- **Rocket effects** (`rocketEffects.ts`): adds a corona effect to flying rockets.
- **Roll while running** (`runRoll.ts`): press `Crouch` when running to perform a roll.
- **Save anywhere** (`saveAnywhere.ts`): press `F4` while on foot and not on a mission to save the game.
- **Semi-free camera** (`semiFreeCamera.ts`): orbit the camera freely around Tommy when on foot and not moving.
- **Sky overlay** (`skyOverlay.ts`): draws a barely visible screen overlay based on the average colour of the sky, making the picture a bit softer.
- **Walking mode** (`walking.ts`): press `Left Alt` to toggle walking mode.
- **Weapon switch animation** (`weaponChangeAnim.ts`): a simple animation when Tommy changes weapons.

### Added in version 2 [2026-10-01]:

- **Ammo limit** (`ammoLimit.ts`): weapon ammunition is now limited, almost like in GTA IV.
- **Cancel crouching** (`cancelCrouch.ts`): crouching can now be cancelled by simply starting moving.
- **Car accidents deal damage** (`carAccidentDamage.ts`): crashing vehicles also damages the player.
- **Car freebies** (`carFreebies.ts`): modified and additional bonuses found in various vehicles.
- **Dynamic gang zones** (`gangZones.ts`): members of each gang can now with a different chance spawn outside their home territory.
- **Lose wanted level** (`loseWantedLevel.ts`): getting far enough from the police makes your wanted level slowly decrease.
- **Display money changes** (`moneyChange.ts`): the amount of money you get or lose is now displayed on screen [1].
- **New parked vehicles** (`newParkedVehicles.ts`): the city has got more parked vehicles, including rare ones.
- **New zone and vehicle names style** (`printNames.ts`): a different style of displaying zones' and vehicles' names.
- **More costly restart** (`restartCost.ts`): restarts are now more expensive: you lose from $300 to $10000 when wasted and from $1000 to 60% of your money when busted.

## Notes:

1. Unfortunately, to correctly draw texts in VC, the default functions displaying zones' and vehicles' names must be disabled to avoid crashing the game. They can be replaced by `New zone and vehicle names style` script.

---

## РУССКИЙ

- **Автор**: Vital (Виталий Павлович Ульянов).
- **Версия**: 2 [2026-10-01].
- **Благодарю за помощь**: Seemann, Miran, Fix, ThirteenAG, Birds.
- **Описание**: Набор скриптов на CLEO Redux, призванный улучшить и расширить некоторые стороны игры, сохраняя, насколько возможно, атмосферу оригинала.
- **Требования**: CLEO Redux v1.5.0 + CLEO 2.2.0 или новее, GTA: Vice City v1.0.
- **Установка**: Поместите `ScriptingKit` и `ViceCityRedux` в каталог `GTA Vice City\CLEO`.

## Скрипты:

### Добавлено в версии 1 [2026-04-03]:

- **Переключение прицела** (`crosshair.ts`): включайте и выключайте прицел кнопкой `Цель`.
- **Выброс оружия** (`dropWeapon.ts`): держите кнопку `Действие`, чтобы выбросить текущее оружие. Через 20 секунд оно исчезнет.
- **Динамическое поле зрения** (`dynamicFov.ts`): поле зрения зависит от скорости транспорта или наклона камеры пешком.
- **Скрытие HUD’а** (`hideHud.ts`): нажмите `+` на клавиатуре, чтобы переключить HUD (интерфейс).
- **Простое лазанье** (`higherJump.ts`): нажмите `Прыжок` в воздухе, чтобы «перелезть» (по сути, прыгнуть повыше).
- **Правки HUD’а** (`hudTweaks.ts`): мелкие изменения HUD’а: удаление нулей у денег и другое отображение патронов.
- **Вспышка при убийстве** (`killFlash.ts`): короткая вспышка на экране при убийствах.
- **Управление мышью** (`mouseControl.ts`): новое управление мышью в транспорте. Нажмите `Правую клавишу мыши` для выбора между обычным (руление) и дополнительным (поворот вертолёта влево/вправо; поворот башни танка; поворот водяной пушки в пожарной машине; гидравлика в Voodoo) режимом.
- **Без экранов загрузки** (`noSplashScreens.ts`): убирает экраны загрузки между островами.
- **Пироман** (`pyromaniac.ts`): огонь при взрыве транспорта, распространение огня, поджог земли при долгой стрельбе из огнемёта и небольшие визуальные эффекты взрывов.
- **Случайное оружие банд** (`randomGangWeapons.ts`): время от времени даёт бандам случайное оружие.
- **Отдача оружия** (`recoil.ts`): отдача (смещение прицела) от оружия, зависящая от его вида.
- **Регенерация** (`regeneration.ts`): здоровье восстанавливается до 50%.
- **Эффекты ракет** (`rocketEffects.ts`): эффект короны у летящих ракет.
- **Кувырок при беге** (`runRoll.ts`): нажмите `Присесть` при беге для кувырка.
- **Сохранение везде** (`saveAnywhere.ts`): нажмите `F4` вне транспорта и миссий для сохранения игры.
- **Полусвободная камера** (`semiFreeCamera.ts`): свободно вращайте камеру вокруг Томми, когда он не в транспорте и неподвижен.
- **Наложение цвета неба** (`skyOverlay.ts`): рисует на экране едва заметный слой, окрашенный в усреднённый цвет неба, делая картинку чуть мягче.
- **Режим ходьбы** (`walking.ts`): нажмите `Левый Alt` для переключения ходьбы.
- **Анимация смены оружия** (`weaponChangeAnim.ts`): простенькая анимация, когда Томми меняет оружие.

### Добавлено в версии 2 [2026-10-01]:

- **Лимит патронов** (`ammoLimit.ts`): теперь боезапас оружия ограничен, почти как в GTA IV.
- **Отмена приседания** (`cancelCrouch.ts`): из положения присев теперь можно выйти, просто начав идти.
- **Урон от аварий** (`carAccidentDamage.ts`): автомобильные аварии наносят урон и игроку.
- **Бонусы в транспорте** (`carFreebies.ts`): изменённые и новые бонусы в транспорте.
- **Меняющиеся зоны банд** (`gangZones.ts`): члены каждой банды могут с некоторым шансом появиться за пределами своей территории.
- **Уход от розыска** (`loseWantedLevel.ts`): если достаточно удалиться от полиции, уровень розыска постепенно спадает.
- **Показ изменений суммы денег** (`moneyChange.ts`): отображает, сколько денег Вы получили или потеряли [1].
- **Новый припаркованный транспорт** (`newParkedVehicles.ts`): в городе стало больше припаркованного транспорта, включая редкий.
- **Новый стиль названий зон и транспорта** (`printNames.ts`): альтернативный стиль отображения названий районов и транспорта.
- **Более дорогое возрождение** (`restartCost.ts`): возрождение стало дороже: при смерти Вы потеряете от $300 до $10000, а при аресте — от $1000 до 60% своих денег.

## Заметки:

1. К сожалению, для правильного рисования текста в VC стандартные функции отображения названия зон и транспорта нужно отключать во избежание вылета игры. Их можно заменить скриптом `Новый стиль названий зон и транспорта`.
