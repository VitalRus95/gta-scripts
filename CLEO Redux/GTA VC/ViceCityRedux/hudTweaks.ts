// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required

// Remove zeros in money
[0x24, 0x25, 0x64, 0, 0, 0].forEach((n, i) => {
    Memory.WriteU8(0x697b48 + i, n, false);
});

// Change ammo style to '%d+%d'
[0x25, 0x64, 0x2b, 0x25, 0x64, 0].forEach((n, i) => {
    Memory.WriteU8(0x697b5c + i, n, false);
});
