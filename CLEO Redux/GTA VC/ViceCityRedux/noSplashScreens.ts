// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
// Disable two calls in CStreaming::LoadBigBuildingsWhenNeeded()
Memory.Write(0x40e00e, 5, 0x90, true);
Memory.Write(0x40e01c, 5, 0x90, true);
