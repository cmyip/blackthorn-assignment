export class DtoMapper {
    public static MapToDto(entity:any, dto: any) {
        for (const key in dto) {
            dto[key] = entity[key];
        }
        return dto;
    }
}
