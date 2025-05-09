export default function PageHeader({ title, description, actions }) {
  return (
    <div className="border-b bg-white py-6 px-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description && <p className="text-gray-600 mt-1">{description}</p>}
        </div>
        {actions && <div className="flex space-x-2">{actions}</div>}
      </div>
    </div>
  );
}
