import { FileMakerService } from "@/services/filemaker.service";

export class EventRepository {
	static async findById(id: string) {
		return FileMakerService.find("WorkshopEventApi", { ID: `=${id}` }, [{ fieldName: "ID", sortOrder: "ascend" }]);
	}
}
