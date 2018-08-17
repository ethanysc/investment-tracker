class Api::V1::ReviewsController < ApiController
  before_action :authenticate_user!, except: [:show, :destroy]

  def create
    review = Review.new(review_params)
    review.user = current_user

    if review.save
      render json: { review: ReviewSerializer.new(review) }
    else
      render json: { errors: review.errors }
    end
  end

  def show
    review = Review.find(params[:id])
    render json: { adminStatus: admin_status?(review) }
  end

  def destroy
    review = Review.find(params[:id])
    stock_id = review.stock.id

    if review.destroy
      render json: { body: "deleted successfully", stockId: stock_id }
    else
      render json: { errors: "delete failed" }
    end
  end

  def admin_status? (review)
    if current_user.admin? || current_user.id == review.user_id
      true
    else
      false
    end
  end

  def review_params
    params
      .require(:review)
      .permit(
        :body,
        :stock_id
      )
  end
end
