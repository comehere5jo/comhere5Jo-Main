
// ๐ฅซ data Access Layer
// ๋ฐ์ดํฐ ์ก์ธ์ค ๊ณ์ธต์ ์ฟผ๋ฆฌ๋ฅผ ์ํํ์ฌ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์ํธ ์์ฉํฉ๋๋ค. ์ ๊ฐ ์ฌ์ฉํ๊ณ  ์๋ Sequelize๋ Data Access Layer์ ์ญํ ์ ์ผ๋ถ๋ฅผ ๋์ฒดํด์ค๋๋ค.
// sequelize๋ฅผ ์ฌ์ฉํ์ง ์์ผ๋ฉด ์๋์ ๊ฐ์ด data Access Layer๋ฅผ ๋ด๋นํ๋ ํ์ผ์ ์ฟผ๋ฆฌ๋ฌธ์ ๋ชจ์์ ํ์ํ  ๋ service ๊ณ์ธต์์ ํธ์ถํด์ ์ฌ์ฉํฉ๋๋ค.

const { Order } = require('.././models');

class ReviewRepository {
    constructor(reviewModel) {
        this.reviewModel = reviewModel;
    }

    //๋ฆฌ๋ทฐ์กฐํ(์ฃผ๋ฌธ๋ฒํธ์๋ํ๋ฆฌ๋ทฐ์กฐํ)(ํ์ธ์๋ฃ)
    findReviewByOrderId = async (orderId) => {
        try{
            const review = await this.reviewModel.findOne({where: {orderId}});
            return review;
        } catch (error){
            return error;
        }

    };

    //๋ฆฌ๋ทฐ์ฐพ๊ธฐ
    findById = async (id) => {
        try{
            const review = await this.reviewModel.findByPk(id);
            return review;
        } catch (error){
            return error;
        }
    };

    //ํน์  ์ฃผ๋ฌธ ์ฐพ๊ธฐ(ํ์ธ์๋ฃ)
    findCertainOrder = async (orderId) => {
        try {
            const order = await Order.findOne({
                where: {
                    id: orderId,
                },
            });
            return order;
        } catch (error) {
            return error;
        }
    }

    //๋ฆฌ๋ทฐ์์ฑ(ํ์ธ์๋ฃ)
    writeReview = async (rating, content, picture, orderId, customerId, managerId) => {
        try{
            return await this.reviewModel.create({
            rating,
            content,
            picture,
            orderId,
            customerId,
            managerId
        })
        } catch (error) {
            return error;
        }
    };

    //๋ฆฌ๋ทฐ ์์ (ํ์ธ์๋ฃ)
    updateReview = async (id, rating, content , picture, comment, status, managerId) => {
        try{
            const updatedReviewData = await this.reviewModel.update(
                { rating, content, picture, comment, status, managerId },
                { where: { id } },
            );
            return updatedReviewData;
        } catch (error){
            return error;
        }
    }

    //๋ฆฌ๋ทฐ์ญ์ (ํ์ธ์๋ฃ)
    deleteReview = async (id) => {
        try{
            return await this.reviewModel.destroy({where: {id}});
        } catch (error){
            return error;
        }
    };

    //์ฌ์ฅ๋์ด ๋ณธ์ธ์ด ์ฒ๋ฆฌํ ์ฃผ๋ฌธ์ ๋ํ ๋ฆฌ๋ทฐ ์กฐํ(ํ์ธ์๋ฃ)
    findReviewManagerId = async (id) => {
        try{
            const review = await this.reviewModel.findAll({
                where: {
                    managerId: id
                }
            });
            return review;
        } catch (error){
            return error;
        }
    };

    // managerReviewUpdate = async (id, managerId, comment) => {
    //     const managerReviewUpdateData = await this.reviewModel.update(
    //         {managerId, comment},
    //         {where: {id: id}},
    //     );
    //     return managerReviewUpdateData;
    // };
}

module.exports = ReviewRepository;



