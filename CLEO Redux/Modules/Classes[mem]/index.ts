//	Script by Vital (Vitaly Pavlovich Ulyanov)
//  Example scripts starter for Classes module for CLEO Redux

let scripts: string[] = ["dynamicFov"];

scripts.forEach((s) => CLEO.runScript(`./examples/${s}[mem].ts`));
