export type FamilyMemberModel = {
    id: number,
    externalUserId: number,
    name: string,
    userName: string,
    dob: string,
    info: string
}

export type FamilyModel =
    {
        id: number,
        name: string,
        info: string,
        familyMembers: FamilyMemberModel[]
    }

export type getUserFamiliesModel = {
    families: FamilyModel[],
    resultsAmount: number
}

export type addFamiliesModel = {
    id?: number,
    name: string,
    info: string
}

export type addFamilyMemberModel = {
    externalUserId?: number,
    familyId?: number,
    name?: string,
    userName?: string,
    dob?: string,
    info: string
}

