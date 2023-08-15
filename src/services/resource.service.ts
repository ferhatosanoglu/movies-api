import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { FilterModel } from 'src/models/filter.schema';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export class ResourceService<T extends any, C extends any, U extends any> {
    constructor(protected readonly mongoModel: Model<T>) { }

    async create(user: C) {
        return await this.mongoModel.create(user);
    }

    async update(id: string, data: U) {
        return this.mongoModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return this.mongoModel.findByIdAndDelete(id);
    }

    async find(id: string) {
        return await this.mongoModel.findOne({
            where: { id },
        });
    }

    async list(currentUser,searchItem, query?: FilterModel) {
        const search = [];
        query?.search
            ? searchItem.map((item) => {
                    search.push({ [item]: { $regex: query.search, $options: 'i' } });
            })
            : search.push({
                [searchItem[0]]: { $regex: '', $options: 'i' },
            });
        const data = await this.mongoModel
            .find({
                creatorId: currentUser,
                $or: search,
            })
            .skip(query.page * query.size)
            .limit(query.size)
            .lean();
        const pageOptions = {
            page: query.page,
            limit: query.size,
            total: await this.mongoModel
                .countDocuments({
                    creatorId: currentUser,
                    $or: search,
                })
                .exec(),
            totalpage: Math.ceil(
                (await this.mongoModel
                    .countDocuments({
                        $or: search,
                    })
                    .exec()) / query.size,
            ),
        };
        return { data: data, pageOptions: pageOptions };
    }
}