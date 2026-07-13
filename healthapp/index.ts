import express from 'express';

const app = express();
app.use(express.json());
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

// Định nghĩa endpoint /hello
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    // Xác thực dữ liệu: Nếu bị thiếu tham số HOẶC tham số không phải là số (NaN)
    if (!req.query.height || !req.query.weight || isNaN(height) || isNaN(weight)) {
        // Trả về lỗi 400 Bad Request và JSON thông báo lỗi
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }
    const bmi = calculateBmi(height,weight);
    return res.json({
    weight: weight,
    height: height,
    bmi: bmi
  });
});

app.post('/exercises', (req, res) => {
  // 1. Lấy dữ liệu và tắt cảnh báo ESLint theo sự cho phép của đề bài
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const body: any = req.body;
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const { daily_exercises, target } = body;

  // 2. Kiểm tra lỗi thiếu tham số (missing parameters)
  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  // 3. Kiểm tra lỗi sai định dạng sơ bộ (malformatted parameters)
  // daily_exercises bắt buộc phải là mảng, target bắt buộc phải là số
  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  // Kiểm tra sâu hơn: Đảm bảo mọi phần tử trong mảng đều có thể ép thành số
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const hasNaNInArray = daily_exercises.some((hours: string | number) => isNaN(Number(hours)));
  
  if (hasNaNInArray) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  // 4. Nếu mọi thứ đã an toàn, ép kiểu dữ liệu chuẩn xác và gọi hàm
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const dailyExercisesNum: number[] = daily_exercises.map((h: string | number) => Number(h));
  const targetNum: number = Number(target);

  const result = calculateExercises(dailyExercisesNum, targetNum);
  
  // Trả về JSON kết quả
  return res.json(result);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});