import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { Branch } from "@types";

export const BranchService = {
  async getBranches() {
    const res = await apiConfig().getRequest(ApiUrls.BRANCH);
    return res;
  },
  async createBranch(model: Branch) {
    const res = await apiConfig().postRequest(ApiUrls.BRANCH, model);
    return res;
  },
  async updateBranch(model: Branch, id: number): Promise<any> {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.BRANCH}/${id}`,
      model
    );
    return res;
  },
  async deleteBranch(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.BRANCH}/${id}`);
    return res;
  },
};
