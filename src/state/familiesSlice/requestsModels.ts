export type familyMemberModel =  {
    id: number,
    externalUserId: number,
    name: string,
    userName: string,
    dob: string,
    info: string
}

export type familyModel =
    {
        id: number,
        name: string,
        info: string,
        familyMembers: familyMemberModel[]
    }

export type getUserFamiliesModel = {
    families: familyModel[],
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

