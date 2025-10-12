import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  name: string;
  href: string;
}

interface MenuItemProps {
  name: string;
  href: string;
  target?: string;
  isDropdown?: boolean;
  dropdownItems?: DropdownItem[];
  onTimelineClick?: (e: React.MouseEvent) => void;
  onSupportClick?: (e: React.MouseEvent) => void;
  isActive: (path: string, name: string) => boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  href,
  target,
  isDropdown,
  dropdownItems,
  onTimelineClick,
  onSupportClick,
  isActive,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [dropdownTimeout, setDropdownTimeout] =
    React.useState<NodeJS.Timeout | null>(null);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); // 300ms delay before closing
    setDropdownTimeout(timeout);
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  if (isDropdown) {
    return (
      <div className='relative'>
        <div
          className='flex items-center space-x-1 text-bolt-base transition-colors duration-200 text-gray-600 hover:text-bitcoin cursor-pointer'
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <span>{name}</span>
          <ChevronDown className='h-4 w-4' />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            className='absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-custom-border py-2 z-50'
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            {dropdownItems?.map((dropdownItem) => (
              <Link
                key={dropdownItem.name}
                to={dropdownItem.href}
                onClick={
                  dropdownItem.name === "Support Us"
                    ? onSupportClick
                    : undefined
                }
                className='block px-4 py-2 text-sm text-gray-600 hover:text-bitcoin hover:bg-gray-50 transition-colors duration-200'
              >
                {dropdownItem.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={href}
      target={target}
      onClick={
        name === "Timeline"
          ? onTimelineClick
          : name === "Support Us"
          ? onSupportClick
          : undefined
      }
      className={`text-bolt-base transition-colors duration-200 ${
        isActive(href, name)
          ? "text-bitcoin"
          : "text-gray-600 hover:text-bitcoin"
      }`}
    >
      {name}
    </Link>
  );
};

export default MenuItem;
