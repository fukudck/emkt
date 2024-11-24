/**
 * Toolpad data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";

export default createDataProvider({
  async getRecords({ paginationModel: { start, pageSize } }) {
    return {
      records: [],
    };
  },
});
