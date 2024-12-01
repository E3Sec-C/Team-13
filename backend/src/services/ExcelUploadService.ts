import { StudentRepository } from "../repository/index";
class ExcelUploadService{
    async uploadExcel(ID:string, data:{})
    {
        try{
            return await StudentRepository.updateById(ID,data);
        }catch(error)
        {
            return error;
        }
    }
}
export default new ExcelUploadService();