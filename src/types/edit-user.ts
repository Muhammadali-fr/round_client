enum Role {
    COSTUMER = "CUSTOMER",
    SELLER = "SELLER",
};

export interface UserEditProp {
    image: File;
    name: string;
    role: Role;
};