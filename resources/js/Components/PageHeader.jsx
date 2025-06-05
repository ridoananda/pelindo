import theme from "@/theme";

export default function PageHeader({ title, description, actions, pattern = "waves" }) {
  // Select background pattern based on prop
  const patternStyle = {
    waves: theme.patterns.waves,
    compass: theme.patterns.compass,
    shipWheel: theme.patterns.shipWheel,
  };

  const selectedPattern = patternStyle[pattern] || patternStyle.waves;

  return (
    <div className="relative">
      <div
        className="absolute inset-0 h-full bg-blue-900"
        style={{
          backgroundImage: selectedPattern,
          backgroundSize: "cover",
          opacity: 0.9
        }}
      ></div>

      <div className="relative py-8 px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h1>
            {description && (
              <p className="text-blue-100 max-w-2xl">
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex space-x-2">
              {actions}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 40">
          <path
            fill="#f9fafb"
            fillOpacity="1"
            d="M0,32L80,26.7C160,21,320,11,480,10.7C640,11,800,21,960,26.7C1120,32,1280,32,1360,32L1440,32L1440,40L1360,40C1280,40,1120,40,960,40C800,40,640,40,480,40C320,40,160,40,80,40L0,40Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
