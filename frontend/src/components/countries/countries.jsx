import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const CountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  // Fetch all countries on initial load
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

  // Fetch countries by name (search query)
  useEffect(() => {
    if (!searchQuery.trim()) return;

    const fetchCountriesByName = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(searchQuery)}`
        );
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.error("Error fetching countries by name:", err);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchCountriesByName, 500);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Fetch countries by region
  useEffect(() => {
    if (!regionFilter || searchQuery) return;

    const fetchCountriesByRegion = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/region/${encodeURIComponent(regionFilter)}`
        );
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.error("Error fetching countries by region:", err);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountriesByRegion();
  }, [regionFilter, searchQuery]);

  const filteredCountries = countries;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">
        World Countries Map Viewer
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by country name..."
          className="px-4 py-2 w-full md:w-1/2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4">
        <div
          className={`${
            searchQuery || regionFilter ? "md:w-3/4" : "w-full"
          } h-[600px]`}
        >
          {loading ? (
            <p className="text-center mt-10 text-lg">Loading map...</p>
          ) : (
            <MapContainer
              center={[20, 0]}
              zoom={2}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredCountries.map((country) => {
                const latlng = country.latlng;
                if (!latlng) return null;
                return (
                  <Marker position={latlng} key={country.cca3}>
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
          )}
        </div>

        {(searchQuery || regionFilter) && (
          <div className="md:w-1/4 bg-white border rounded shadow p-4 max-h-[600px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">Search Results</h2>
            {filteredCountries.length === 0 ? (
              <p>No countries found.</p>
            ) : (
              <ul>
                {filteredCountries.map((country) => (
                  <li key={country.cca3} className="mb-4 border-b pb-2">
                    <img
                      src={country.flags?.png}
                      alt={country.name.common}
                      className="w-10 h-6 inline-block mr-2"
                    />
                    <span className="font-medium">{country.name.common}</span>
                    <div className="text-sm text-gray-600">
                      {country.capital?.[0] || "N/A"} – {country.region}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountriesPage;
