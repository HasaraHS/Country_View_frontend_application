import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../countries/countries.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const defaultIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const selectedIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchAllCountries = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.error("Error fetching all countries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCountries();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) return;

    const fetchCountriesByName = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setCountries(data);
        setSuggestions(data);
      } catch (err) {
        console.error("Error fetching countries by name:", err);
        setCountries([]);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchCountriesByName, 500);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) return;

    const fetchCountries = async () => {
      setLoading(true);
      try {
        const url = regionFilter
          ? `https://restcountries.com/v3.1/region/${encodeURIComponent(regionFilter)}`
          : `https://restcountries.com/v3.1/all`;
        const res = await fetch(url);
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [regionFilter, searchQuery]);

  const handleMarkerClick = async (code) => {
    setSelectedMarkerId(code);
    try {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
      const data = await res.json();
      setSelectedCountry(data[0]);
    } catch (err) {
      console.error("Error fetching selected country:", err);
      setSelectedCountry(null);
    }
  };

  const handleSuggestionClick = async (country) => {
    setSearchQuery(country.name.common);
    setSuggestions([]);
    await handleMarkerClick(country.cca3);
  };

  return (
    <div className="container">
      {/* Bubble Background */}
      <div className="bubble">
        {Array.from({ length: 40 }, (_, i) => (
          <span key={i} style={{ "--i": 10 + (i % 20) }}></span>
        ))}
      </div>

      {/* Foreground Content */}
      <div className="content">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4">
          {/* Heading */}
          <div className="w-full md:w-auto">
            <h3 className="text-xl font-bold text-white font-Montserrat text-center md:text-left">
              Mapify Nations
            </h3>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto ml-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search by country name..."
                className="px-6 py-3 w-full border-2 border-[#00A1B9] rounded-2xl text-white font-Montserrat"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 bg-white text-black rounded-lg shadow-lg w-full max-h-60 overflow-y-auto" style={{ zIndex: 9999 }}>
                  {suggestions.slice(0, 10).map((country) => (
                    <div
                      key={country.cca3}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSuggestionClick(country)}
                    >
                      {country.name.common}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <select
              className="px-5 py-3 border-2 border-[#00A1B9] rounded-2xl text-white font-Montserrat w-full md:w-auto"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              <option value="" className="text-black">All Regions</option>
              <option value="Africa" className="text-black">Africa</option>
              <option value="Americas" className="text-black">Americas</option>
              <option value="Asia" className="text-black">Asia</option>
              <option value="Europe" className="text-black">Europe</option>
              <option value="Oceania" className="text-black">Oceania</option>
            </select>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-6" />

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className={`${searchQuery || regionFilter ? "md:w-3/4" : "w-full"} h-[550px]`}>
            {loading ? (
              <p className="text-center mt-10 text-lg">Loading map...</p>
            ) : (
              <div className="w-full h-full border-2 border-[#00A1B9] rounded-2xl overflow-hidden">
                <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {countries.map((country) => {
                    const latlng = country.latlng;
                    if (!latlng) return null;
                    return (
                      <Marker
                        position={latlng}
                        key={country.cca3}
                        icon={selectedMarkerId === country.cca3 ? selectedIcon : defaultIcon}
                        eventHandlers={{
                          click: () => handleMarkerClick(country.cca3),
                        }}
                      >
                        <Popup>
                          <img
                            src={country.flags?.png}
                            alt={`Flag of ${country.name.common}`}
                            className="w-20 mb-2"
                          />
                          <strong>{country.name.common}</strong>
                          <br />
                          Capital: {country.capital?.[0] || "N/A"}
                          <br />
                          Region: {country.region}
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            )}
          </div>

          {(searchQuery || regionFilter || selectedCountry) && (
            <div className="md:w-1/4 bg-white border-[#00A1B9] border-2 rounded-2xl shadow p-4 max-h-[550px] overflow-y-auto">
              {selectedCountry ? (
                <div>
                  <img src={selectedCountry.flags?.png} alt={selectedCountry.name.common} className="w-25 h-auto mb-4 mx-auto" />
                  <h2 className="text-xl font-bold text-center mb-3">{selectedCountry.name.common}</h2>
                  <p className="mb-2"><strong>Official Name:</strong> {selectedCountry.name.official}</p>
                  <p className="mb-2"><strong>Capital:</strong> {selectedCountry.capital?.[0] || "N/A"}</p>
                  <p className="mb-2"><strong>Region:</strong> {selectedCountry.region}</p>
                  <p className="mb-2"><strong>Subregion:</strong> {selectedCountry.subregion || "N/A"}</p>
                  <p className="mb-2"><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
                  <p className="mb-2"><strong>Area:</strong> {selectedCountry.area.toLocaleString()} km²</p>
                  <p className="mb-2"><strong>Languages:</strong> {selectedCountry.languages ? Object.values(selectedCountry.languages).join(", ") : "N/A"}</p>
                  <p><strong>Currencies:</strong> {selectedCountry.currencies ? Object.values(selectedCountry.currencies).map(c => `${c.name} (${c.symbol})`).join(", ") : "N/A"}</p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountriesPage;
