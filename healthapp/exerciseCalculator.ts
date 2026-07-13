interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
    // Tổng số ngày trong chu kỳ
    const periodLength = dailyExerciseHours.length;

    // Số ngày có tập (lọc các ngày có giờ tập > 0)
    const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;

    // Tổng số giờ tập
    const totalHours = dailyExerciseHours.reduce((sum, current) => sum + current, 0);

    // Trung bình mỗi ngày
    const average = periodLength === 0 ? 0 : totalHours / periodLength;

    // Đánh giá dựa trên tỷ lệ đạt được so với mục tiêu (Bạn có thể tự do tùy chỉnh logic này)
    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'excellent work, target reached';
    } else if (average >= target * 0.8) { // Đạt từ 80% mục tiêu trở lên
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'you need to work harder to reach your goal';
    }
    return {
        periodLength,
        trainingDays,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    };
};
interface ExerciseValues {
    target: number;
    dailyExerciseHours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Không đủ tham số! Hãy nhập ít nhất: mục_tiêu ngày_1 ngày_2...');

    // Tham số đầu tiên là target
    const target = Number(args[2]);
    if (isNaN(target)) throw new Error('Mục tiêu phải là một con số!');

    // Các tham số còn lại là mảng giờ tập
    const dailyExerciseHours: number[] = [];

    for (let i = 3; i < args.length; i++) {
        const hours = Number(args[i]);
        if (isNaN(hours)) {
            throw new Error(`Giá trị ở vị trí thứ ${i + 1} không phải là số!`);
        }
        dailyExerciseHours.push(hours);
    }

    return {
        target,
        dailyExerciseHours
    };
};
if (process.argv[1] === import.meta.filename) {

    try {
        const { target, dailyExerciseHours } = parseExerciseArguments(process.argv);
        console.log(calculateExercises(dailyExerciseHours, target));
    } catch (error: unknown) {
        let errorMessage = 'Có lỗi xảy ra: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}