import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';

/**
 * Form untuk menambah atau mengedit data Risk Report
 * @param {Object} props - Props komponen
 * @param {Object} props.report - Data report yang akan diedit (optional)
 * @param {Function} props.onClose - Callback untuk menutup modal
 * @param {boolean} props.isEdit - Mode edit atau create
 */
export default function RiskReportForm({ report = null, onClose, isEdit = false }) {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    report_date: report?.report_date || new Date().toISOString().split('T')[0],
    risk_type: report?.risk_type || '',
    description: report?.description || '',
    recommended_action: report?.recommended_action || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isEdit) {
      put(route('risk-reports.update', report.id), {
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
      post(route('risk-reports.store'), {
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
            label="Tanggal Laporan"
            name="report_date"
            type="date"
            value={data.report_date}
            onChange={(e) => setData('report_date', e.target.value)}
            error={errors.report_date}
            required
          />
        </div>

        <div>
          <Input
            label="Jenis Risiko"
            name="risk_type"
            value={data.risk_type}
            onChange={(e) => setData('risk_type', e.target.value)}
            error={errors.risk_type}
            placeholder="Masukkan jenis risiko"
            required
          />
        </div>
      </div>

      <div>
        <Textarea
          label="Deskripsi Risiko"
          name="description"
          value={data.description}
          onChange={(e) => setData('description', e.target.value)}
          error={errors.description}
          placeholder="Jelaskan detail risiko yang terjadi"
          rows={4}
          required
        />
      </div>

      <div>
        <Textarea
          label="Tindakan yang Direkomendasikan"
          name="recommended_action"
          value={data.recommended_action}
          onChange={(e) => setData('recommended_action', e.target.value)}
          error={errors.recommended_action}
          placeholder="Masukkan tindakan yang direkomendasikan untuk menangani risiko"
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
          className="bg-green-600 hover:bg-green-700"
        >
          {processing || isSubmitting ? 'Menyimpan...' : (isEdit ? 'Update' : 'Simpan')}
        </Button>
      </div>
    </form>
  );
}
