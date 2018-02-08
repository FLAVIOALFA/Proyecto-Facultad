import { Domicilio} from "./domicilio.model";
import { Role } from "./role.model";

export class Usuario{

    public nombre: string;
    public apellido: string;
    public email: string;
    public fecha_nacimiento: string;
    public pass01: string;
    public pass02:string;
    public sexo:string;
    public telefono:number;
    public domicilio: Domicilio;
    public role : Role;

    constructor(){}
}
