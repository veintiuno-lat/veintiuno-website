import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Clock, Calendar } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { Card as UICard, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { meetups, getUniqueCategories, getUniqueTypes } from "../data/meetups";
import { CalendarProvider } from "../calendar/contexts/calendar-context";
import CalendarContainer from "../calendar/components/calendar-container";
import { convertMeetupsToEvents } from "../calendar/utils/meetup-to-event";

// Define Meetup type inline to avoid import issues
interface Meetup {
  id: number;
  title: string;
  date: string;
  location: string;
  time: string;
  country: string;
  flag: string;
  category: string;
  type: string;
  image: string;
  organizedBy?: string;
}

const MeetupsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "calendar">("grid");

  const categories = getUniqueCategories();
  const types = getUniqueTypes();

  const filteredMeetups = meetups.filter((meetup) => {
    const matchesCategory =
      !selectedCategory || meetup.category === selectedCategory;
    const matchesType = !selectedType || meetup.type === selectedType;
    return matchesCategory && matchesType;
  });

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedType("");
  };

  const MeetupCard: React.FC<{ meetup: Meetup }> = ({ meetup }) => {
    return (
      <Link to={`/meetup/${meetup.id}`}>
        <UICard className='overflow-hidden border-0 transition-all duration-300 hover:scale-105 cursor-pointer'>
          <div className='relative h-48'>
            <img
              src={meetup.image}
              alt={meetup.title}
              className='w-full h-full object-cover'
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.className =
                    parent.className.replace("overflow-hidden", "") +
                    " bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center";
                  parent.innerHTML = `
                    <div class="text-center text-white">
                      <div class="text-white font-bold text-xs mb-1">BTC</div>
                      <div class="text-white font-bold text-xs">${
                        meetup.title.split(" ")[0]
                      }</div>
                    </div>
                  `;
                }
              }}
            />
          </div>
          <CardContent className='p-4'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2 font-heading'>
              {meetup.title}
            </h3>
            <div className='flex items-center text-custom-gray text-sm mb-1'>
              <span className='mr-2'>{meetup.flag}</span>
              <span>{meetup.location}</span>
            </div>
            <div className='flex items-center text-custom-gray text-sm'>
              <Clock className='w-4 h-4 mr-1' />
              <span>{meetup.time}</span>
            </div>
          </CardContent>
        </UICard>
      </Link>
    );
  };

  return (
    <>
      <SEOHead
        title='Meetups - Veintiuno'
        description='Descubre eventos y meetups de Bitcoin en Latinoamérica'
        keywords={[
          "meetups",
          "eventos",
          "bitcoin",
          "latinoamérica",
          "comunidad",
        ]}
      />

      <div className='min-h-screen bg-white'>
        {/* Hero Section */}
        <section
          className='py-24 bg-custom-black text-custom-gray-light relative'
          style={{
            backgroundImage: "url(/images/layout-images/meetup-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className='absolute inset-0 bg-custom-black bg-opacity-60'></div>
          <div className='container relative z-10'>
            <div className='text-center'>
              <h1 className='text-6xl md:text-8xl font-bold text-bitcoin mb-6 font-heading'>
                MEETUPS
              </h1>
              <p className='text-xl text-gray-300 mb-8 font-heading'>
                Each community has 4 unique designs
              </p>
              <Button
                className='bg-bitcoin hover:bg-bitcoin text-white'
                asChild
              >
                <a
                  href='https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml'
                  target='_blank'
                >
                  Agregá la Comunidad!
                  <ExternalLink className='ml-2 h-4 w-4' />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Meetups Section */}
        <section className='py-16'>
          <div className='px-6'>
            <div className='mb-12'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center font-heading'>
                MEETUPS
              </h2>

              {/* Filters */}
              <div className='flex flex-col md:flex-row gap-4 justify-center items-center mb-8'>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className='w-[200px]'>
                    <SelectValue placeholder='Filter by Category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className='w-[200px]'>
                    <SelectValue placeholder='Filter by Type' />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant={viewMode === "calendar" ? "default" : "outline"}
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "calendar" : "grid")
                  }
                  className='flex items-center gap-2'
                >
                  <Calendar className='w-4 h-4' />
                  {viewMode === "grid" ? "Calendar View" : "Grid View"}
                </Button>

                {(selectedCategory || selectedType) && (
                  <Button variant='outline' onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Results count */}
              <p className='text-center text-custom-gray mb-8 font-body'>
                {filteredMeetups.length} meetup
                {filteredMeetups.length !== 1 ? "s" : ""} encontrado
                {filteredMeetups.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Content based on view mode */}
            {viewMode === "grid" ? (
              <>
                {/* Meetups Grid */}
                <div className='flex justify-center'>
                  <div className='grid gap-6 w-full max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {filteredMeetups.map((meetup) => (
                      <MeetupCard key={meetup.id} meetup={meetup} />
                    ))}
                  </div>
                </div>

                {filteredMeetups.length === 0 && (
                  <div className='text-center py-12'>
                    <p className='text-gray-500 text-lg'>
                      No se encontraron meetups con los filtros seleccionados.
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* Calendar View */
              <div className='flex justify-center'>
                <div className='w-full max-w-7xl'>
                  <CalendarProvider
                    events={convertMeetupsToEvents(filteredMeetups)}
                    users={[{ id: "default", name: "Meetups" }]}
                  >
                    <CalendarContainer />
                  </CalendarProvider>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default MeetupsPage;
