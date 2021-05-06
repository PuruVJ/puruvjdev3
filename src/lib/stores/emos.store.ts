import { writable } from "svelte/store";
import type { IEmos } from "../interfaces/emos.interface";

const emoStates = writable<IEmos>({});

export { emoStates };
