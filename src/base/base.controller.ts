export class BaseController {
  async findAll(
    models: any,
    whereConditions = {},
    order = {},
    attributes = null,
  ) {
    const options = {
      where: whereConditions,
      orderBy: order,
      select: attributes,
    };
    return await models.findMany(options);
  }
  async findAndCountAllWithPagination(
    models: any,
    whereConditions = {},
    limit = 10,
    offset = 0,
    order: object = {},
    idAttribute: string,
  ) {
    const [values, count] = await Promise.all([
      models.findMany({
        where: whereConditions,
        skip: offset,
        take: limit,
        orderBy: order,
        select: { [idAttribute]: true },
      }),
      models.count({
        where: whereConditions,
      }),
    ]);

    const targetIdAttributes = values.map((value) => value[idAttribute]);

    const rows = await models.findMany({
      where: { [idAttribute]: { in: targetIdAttributes } },
      orderBy: order,
    });

    return { count, rows };
  }
  // async findOne(whereConditions = {}, include = {}, order = {}) {
  //   const options = {
  //     where: whereConditions,
  //     include: include,
  //     orderBy: order,
  //   };
  //   return await this.model.findFirst(options);
  // }

  // async destroy(key: string, ids: number[]) {
  //   const updateAttribute = { deleted: 1 };

  //   return this.model.updateMany({
  //     where: { [key]: { in: ids } },
  //     data: updateAttribute,
  //   });
  // }
}
