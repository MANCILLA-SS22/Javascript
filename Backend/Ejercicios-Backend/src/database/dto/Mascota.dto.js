class MacotaDTO {
    static getPetInputFrom(pet){
        return {
            name:pet.name||'',
            specie:pet.specie||'',
            image: pet.image||'',
            birthDate:pet.birthDate||'12-30-2000',
            adopted:false
        }
    }
};

export {MacotaDTO}