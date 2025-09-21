import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';
import Select from '@/Components/Select';

/**
 * Form untuk menambah atau mengedit data Risk
 * @param {Object} props - Props komponen
 * @param {Object} props.risk - Data risk yang akan diedit (optional)
 * @param {Function} props.onClose - Callback untuk menutup modal
 * @param {boolean} props.isEdit - Mode edit atau create
 */
export default function RiskForm({ risk = null, onClose, isEdit = false }) {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    type: risk?.type || '',
    impact: risk?.impact || '',
    status: risk?.status || 'Rendah',
    recommendation: risk?.recommendation || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = [
    { value: 'Rendah', label: 'Rendah' },
    { value: 'Menengah', label: 'Menengah' },
    { value: 'Tinggi', label: 'Tinggi' },
    { value: 'Ekstrim', label: 'Ekstrim' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isEdit) {
      put(route('risks.update', risk.id), {
        onSuccess: () => {
          onClose();
          reset();
        },
        onError: () => {
          setIsSubmitting(false);
        },
        onFinish: () => {
          setIsSubmitting(false);
        },
      });
    } else {
      post(route('risks.store'), {
        onSuccess: () => {
          onClose();
          reset();
        },
        onError: () => {
          setIsSubmitting(false);
        },
        onFinish: () => {
          setIsSubmitting(false);
        },
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Jenis Risiko"
            name="type"
            value={data.type}
            onChange={(e) => setData('type', e.target.value)}
            error={errors.type}
            placeholder="Masukkan jenis risiko"
            required
          />
        </div>

        <div>
          <Input
            label="Dampak Risiko"
            name="impact"
            value={data.impact}
            onChange={(e) => setData('impact', e.target.value)}
            error={errors.impact}
            placeholder="Masukkan dampak risiko"
            required
          />
        </div>
      </div>

      <div>
        <Select
          label="Status Risiko"
          name="status"
          value={data.status}
          onChange={(e) => setData('status', e.target.value)}
          error={errors.status}
          options={statusOptions}
          required
        />
      </div>

      <div>
        <Textarea
          label="Rekomendasi Penanganan"
          name="recommendation"
          value={data.recommendation}
          onChange={(e) => setData('recommendation', e.target.value)}
          error={errors.recommendation}
          placeholder="Masukkan rekomendasi penanganan risiko"
          rows={4}
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleClose}
          disabled={processing || isSubmitting}
        >
          Batal
        </Button>
        <Button
          type="submit"
          disabled={processing || isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {processing || isSubmitting ? 'Menyimpan...' : (isEdit ? 'Update' : 'Simpan')}
        </Button>
      </div>
    </form>
  );
}
