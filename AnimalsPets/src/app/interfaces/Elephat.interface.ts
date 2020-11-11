import { Elephant } from '../elephant.model';

export interface LoadElephant {
    [x: string]: any;
    elefantes: Elephant[];
}
