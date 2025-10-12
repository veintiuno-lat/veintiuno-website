import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  name: string;
  href: string;
}

interface MobileMenuItemProps {
  name: string;
  href: string;
  target?: string;
  isDropdown?: boolean;
  dropdownItems?: DropdownItem[];
  onTimelineClick?: (e: React.MouseEvent) => void;
  onSupportClick?: (e: React.MouseEvent) => void;
  onMenuClose: () => void;
  isActive: (path: string, name: string) => boolean;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({
  name,
  href,
  target,
  isDropdown,
  dropdownItems,
  onTimelineClick,
  onSupportClick,
  onMenuClose,
  isActive,
}) => {
  if (isDropdown) {
    return (
      <div>
        <div className='flex items-center justify-between px-4 py-3 rounded-lg text-bolt-base text-gray-600'>
          <span>{name}</span>
          <ChevronDown className='h-4 w-4' />
        </div>
        <div className='ml-4 space-y-1'>
          {dropdownItems?.map((dropdownItem) => (
            <Link
              key={dropdownItem.name}
              to={dropdownItem.href}
              onClick={
                dropdownItem.name === "Support Us"
                  ? (e) => {
                      onSupportClick?.(e);
                      onMenuClose();
                    }
                  : onMenuClose
              }
              className='block px-4 py-2 text-sm text-gray-600 hover:text-bitcoin hover:bg-gray-50 rounded-lg transition-colors duration-200'
            >
              {dropdownItem.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      to={href}
      target={target}
      onClick={
        name === "Timeline"
          ? (e) => {
              onTimelineClick?.(e);
              onMenuClose();
            }
          : onMenuClose
      }
      className={`block px-4 py-3 rounded-lg text-bolt-base transition-colors duration-200 ${
        isActive(href, name)
          ? "text-bitcoin bg-gray-50"
          : "text-gray-600 hover:text-bitcoin hover:bg-gray-50"
      }`}
    >
      {name}
    </Link>
  );
};

export default MobileMenuItem;
