export const calculateBmi = (height: number, weight: number): string => {
    const heightMeters = height / 100;
    const BMI = weight / (heightMeters * heightMeters);

    if (BMI < 18.5) {
        return 'Underweight';
    } else if (BMI >= 18.5 && BMI <= 24.9) {
        return 'Normal range';
    } else {
        return 'Overweight';
    }
};

interface BmiValues {
    height: number;
    weight: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Không đủ tham số! Hãy nhập: chiều_cao cân_nặng');
    if (args.length > 4) throw new Error('Dư thừa tham số!');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Dữ liệu nhập vào phải là số!');
    }
};
// 2. Bọc đoạn code chạy Terminal vào câu lệnh điều kiện này
if (process.argv[1] === import.meta.filename) {
    try {
        const { height, weight } = parseBmiArguments(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
        let errorMessage = 'Có lỗi xảy ra: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}