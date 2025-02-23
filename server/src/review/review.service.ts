import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { Review, ReviewDocument } from './review.schema';
import { Movie, MovieDocument } from 'src/movie/movie.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDto, user: UserDocument) {
    const createdReview = new this.reviewModel(
      createReviewDto,
      (createReviewDto.user = user?.id),
    );
    await this.addReviewToMovie(createdReview);
    return createdReview.save();
  }

  async addReviewToMovie(createdReview: ReviewDocument) {
    const film = await this.movieModel.findByIdAndUpdate(createdReview.movie);
    film?.reviews.push(createdReview.id);
    return film?.save();
  }

  findAll() {
    return this.reviewModel.find().populate('movie', 'title');
  }

  findOne(id: string) {
    return this.reviewModel.findById(id);
  }

  async update(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review | null> {
    return this.userModel.findByIdAndUpdate(id, updateReviewDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.reviewModel.findByIdAndDelete(id);
  }
}
