/**
 * Toolpad data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";

export default createDataProvider({
  paginationMode: "cursor",
  async getRecords({ paginationModel: { cursor, pageSize } }) {
    return {
      records: [],
      cursor: null,
    };
  },
});
