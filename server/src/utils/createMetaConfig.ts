interface TMetaConfig {
  page: number;
  limit: number;
  totalData: number;
  totalPages: number;
}

interface TMetaParams {
  page: number;
  limit: number;
  totalData: number;
}

export const createMetaConfig = ({
  page,
  limit,
  totalData,
}: TMetaParams): TMetaConfig => {
  return {
    page,
    limit,
    totalPages: Math.ceil(totalData / limit),
    totalData,
  };
};
