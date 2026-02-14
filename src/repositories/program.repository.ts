// @/repositories/program.repository.ts
import { FileMakerService } from "@/services/filemaker.service";

export class ProgramRepository {
	static async findBySlug(slug: string) {
		// Returns the 'data' array from FileMaker response
		return FileMakerService.find("LearningProgramApi", { LearningProgramCode: `=${slug.toUpperCase()}` }, [{ fieldName: "LearningProgramNameE", sortOrder: "ascend" }]);
	}
}
