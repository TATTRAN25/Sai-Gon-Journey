import React, { useState } from 'react';
import axios from 'axios';

interface TourScheduleProps {
  tourId: number;
  schedules: Array<{
    id: number;
    schedule_date: string;
    description: string;
  }>;
  onScheduleAdded?: () => void; // Callback để refresh danh sách
}

const TourSchedule: React.FC<TourScheduleProps> = ({ tourId, schedules, onScheduleAdded }) => {
  const [newSchedule, setNewSchedule] = useState({ schedule_date: '', description: '' });
  const [error, setError] = useState<string | null>(null);

  const handleAddSchedule = async () => {
    if (!newSchedule.schedule_date || !newSchedule.description) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    try {
      await axios.post(`/api/tours/${tourId}/schedules`, newSchedule);
      setNewSchedule({ schedule_date: '', description: '' }); // Reset form
      setError(null);
      if (onScheduleAdded) onScheduleAdded(); // Refresh danh sách
    } catch (error) {
      console.error('Error adding schedule:', error);
      setError('Có lỗi xảy ra khi thêm lịch trình.');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Schedules</h3>
      {schedules.map((schedule) => (
        <div key={schedule.id} className="border p-4 rounded-lg">
          <p><strong>Ngày:</strong> {schedule.schedule_date}</p>
          <p><strong>Mô tả:</strong> {schedule.description}</p>
        </div>
      ))}
      <div className="space-y-2">
        <input
          type="date"
          value={newSchedule.schedule_date}
          onChange={(e) => setNewSchedule({ ...newSchedule, schedule_date: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={newSchedule.description}
          onChange={(e) => setNewSchedule({ ...newSchedule, description: e.target.value })}
          placeholder="Mô tả lịch trình"
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleAddSchedule}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Thêm Lịch Trình
        </button>
      </div>
    </div>
  );
};

export default TourSchedule;