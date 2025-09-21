import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';
import Select from '@/Components/Select';

/**
 * Form untuk menambah atau mengedit data Risk Assessment (FMEA)
 * @param {Object} props - Props komponen
 * @param {Object} props.assessment - Data assessment yang akan diedit (optional)
 * @param {Function} props.onClose - Callback untuk menutup modal
 * @param {boolean} props.isEdit - Mode edit atau create
 */
export default function RiskAssessmentForm({ assessment = null, onClose, isEdit = false }) {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    respondent_name: assessment?.respondent_name || '',
    respondent_job: assessment?.respondent_job || 'Manajer Bistek Operasional',
    risk_code: assessment?.risk_code || '',
    risk_description: assessment?.risk_description || '',
    severity: assessment?.severity || 1,
    occurrence: assessment?.occurrence || 1,
    detection: assessment?.detection || 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobOptions = [
    { value: 'Manajer Bistek Operasional', label: 'Manajer Bistek Operasional' },
    { value: 'Petugas Lapangan Operasional', label: 'Petugas Lapangan Operasional' },
  ];

  const scaleOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));

  // Calculate RPN
  const rpn = data.severity * data.occurrence * data.detection;
  const riskLevel = rpn >= 150 ? 'Tinggi' : rpn >= 100 ? 'Sedang' : 'Rendah';

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isEdit) {
      put(route('risk-assessments.update', assessment.id), {
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
      post(route('risk-assessments.store'), {
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
            label="Nama Responden"
            name="respondent_name"
            value={data.respondent_name}
            onChange={(e) => setData('respondent_name', e.target.value)}
            error={errors.respondent_name}
            placeholder="Masukkan nama responden"
            required
          />
        </div>

        <div>
          <Select
            label="Posisi Responden"
            name="respondent_job"
            value={data.respondent_job}
            onChange={(e) => setData('respondent_job', e.target.value)}
            error={errors.respondent_job}
            options={jobOptions}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Kode Risiko"
            name="risk_code"
            value={data.risk_code}
            onChange={(e) => setData('risk_code', e.target.value)}
            error={errors.risk_code}
            placeholder="Contoh: M01, M02, dll"
            required
          />
        </div>

        <div>
          <Textarea
            label="Deskripsi Risiko"
            name="risk_description"
            value={data.risk_description}
            onChange={(e) => setData('risk_description', e.target.value)}
            error={errors.risk_description}
            placeholder="Jelaskan mode kegagalan atau risiko"
            rows={3}
            required
          />
        </div>
      </div>

      {/* FMEA Assessment Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Penilaian FMEA</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Select
              label="Severity (S) - Tingkat Keparahan"
              name="severity"
              value={data.severity}
              onChange={(e) => setData('severity', parseInt(e.target.value))}
              error={errors.severity}
              options={scaleOptions}
              required
            />
            <p className="text-xs text-blue-700 mt-1">
              Seberapa parah dampak jika risiko terjadi (1-10)
            </p>
          </div>

          <div>
            <Select
              label="Occurrence (O) - Tingkat Kemunculan"
              name="occurrence"
              value={data.occurrence}
              onChange={(e) => setData('occurrence', parseInt(e.target.value))}
              error={errors.occurrence}
              options={scaleOptions}
              required
            />
            <p className="text-xs text-green-700 mt-1">
              Seberapa sering risiko kemungkinan terjadi (1-10)
            </p>
          </div>

          <div>
            <Select
              label="Detection (D) - Tingkat Deteksi"
              name="detection"
              value={data.detection}
              onChange={(e) => setData('detection', parseInt(e.target.value))}
              error={errors.detection}
              options={scaleOptions}
              required
            />
            <p className="text-xs text-orange-700 mt-1">
              Seberapa mudah risiko dapat dideteksi (1-10)
            </p>
          </div>
        </div>

        {/* RPN Calculation Display */}
        <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Risk Priority Number (RPN)</h4>
              <p className="text-sm text-gray-600">S × O × D = {data.severity} × {data.occurrence} × {data.detection}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{rpn}</div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                riskLevel === 'Tinggi' ? 'bg-red-500 text-white' :
                riskLevel === 'Sedang' ? 'bg-yellow-500 text-white' :
                'bg-green-500 text-white'
              }`}>
                {riskLevel}
              </span>
            </div>
          </div>
        </div>
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
          className="bg-purple-600 hover:bg-purple-700"
        >
          {processing || isSubmitting ? 'Menyimpan...' : (isEdit ? 'Update' : 'Simpan')}
        </Button>
      </div>
    </form>
  );
}
