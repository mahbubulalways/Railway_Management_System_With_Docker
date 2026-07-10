export const modifySearch = ({
  search,
  stringFields,
  numberFields = [],
}: {
  search: string;
  stringFields: string[];
  numberFields?: string[];
}) => {
  const or: any[] = [];

  if (search) {
    stringFields.forEach((field) => {
      or.push({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      });
    });

    const num = Number(search);
    if (!Number.isNaN(num)) {
      numberFields.forEach((field) => {
        or.push({
          [field]: num,
        });
      });
    }
  }

  return {
    OR: or.length ? or : undefined,
  };
};
