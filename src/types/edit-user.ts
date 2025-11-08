enum Role {
    COSTUMER = "costumer",
    SELLER = "seller"
}

export interface UserEditProp {
    image: File;
    name: string;
    role: Role;
}``