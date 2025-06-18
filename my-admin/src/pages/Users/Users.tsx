"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users as UsersIcon,
  FileText,
  Filter,
  MoreVertical,
  Eye,
  UserX,
  UserPlus,
} from "react-feather";
import StatCard from "../../components/StatsCard/StatCard";
import { getUsers } from "../../services/user";
import type { User, UserStatus } from "../../types/users";
import "./Users.scss";
import Loading from "../../components/Loading/Loading";
import { Database } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError("Failed to load users. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const toggleActionMenu = (userId: number) => {
    if (showActionMenu === userId) {
      setShowActionMenu(null);
    } else {
      setShowActionMenu(userId);
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    // When a field gets a value, it becomes the active filter
    if (value) {
      setActiveFilter(name);
    } else {
      // If the current active filter is cleared, check if any other filters have values
      if (activeFilter === name) {
        const hasOtherActiveFilter = Object.entries(updatedFilters).find(
          ([key, val]) => key !== name && val !== ""
        );
        setActiveFilter(hasOtherActiveFilter ? hasOtherActiveFilter[0] : "");
      }
    }
  };

  const applyFilters = () => {
    let result = [...users];

    if (filters.organization) {
      result = result.filter((user) =>
        user.organization
          .toLowerCase()
          .includes(filters.organization.toLowerCase())
      );
    }

    if (filters.username) {
      result = result.filter((user) =>
        user.username.toLowerCase().includes(filters.username.toLowerCase())
      );
    }

    if (filters.email) {
      result = result.filter((user) =>
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.phoneNumber) {
      result = result.filter((user) =>
        user.phoneNumber.includes(filters.phoneNumber)
      );
    }

    if (filters.status) {
      result = result.filter(
        (user) => user.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.date) {
      result = result.filter((user) => {
        const userDate = new Date(user.dateJoined);
        const filterDate = new Date(filters.date);

        return userDate.toDateString() === filterDate.toDateString();
      });
    }

    setFilteredUsers(result);
    setCurrentPage(1);
    setShowFilter(false);
  };

  const resetFilters = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    });
    setActiveFilter("");
    setFilteredUsers(users);
    setShowFilter(false);
  };

  const getStatusClass = (status: UserStatus): string => {
    switch (status.toLowerCase()) {
      case "active":
        return "status-active";
      case "inactive":
        return "status-inactive";
      case "pending":
        return "status-pending";
      case "blacklisted":
        return "status-blacklisted";
      default:
        return "";
    }
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const isFieldDisabled = (fieldName: string) => {
    return activeFilter !== "" && activeFilter !== fieldName;
  };

  if (loading) {
    return <Loading message="Loading users..." />;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="users-page">
      <h1>Users</h1>

      <div className="stats-grid">
        <StatCard
          icon={<UsersIcon size={20} color="#DF18FF"/>}
          title="Users"
          value={users.length.toLocaleString()}
          iconBgColor="rgba(223, 24, 255, 0.1)
"
        />

        <StatCard
          icon={<UsersIcon size={20} color="#5718FF" />}
          title="Active Users"
          value={users
            .filter((u) => u.status.toLowerCase() === "active")
            .length.toLocaleString()}
          iconBgColor="rgba(87, 24, 255, 0.1)"
        />

        <StatCard
          icon={<FileText size={20} color="#F55F44" />}
          title="Users with Loans"
          value={users.filter((u) => u.Loan).length.toLocaleString()}
          iconBgColor="rgba(245, 95, 68, 0.1)"
        />

        <StatCard
          icon={<Database size={20} color="#FF3366" />}
          title="Users with Savings"
          value={users.filter((u) => u.Savings).length.toLocaleString()}
          iconBgColor="rgba(255, 51, 102, 0.1)"
        />
      </div>

      <div className="users-table-container">
        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>
                  <div className="th-content">
                    ORGANIZATION
                    <button className="filter-button" onClick={toggleFilter}>
                      <Filter size={16} />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    USERNAME
                    <button className="filter-button" onClick={toggleFilter}>
                      <Filter size={16} />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    EMAIL
                    <button className="filter-button" onClick={toggleFilter}>
                      <Filter size={16} />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    PHONE NUMBER
                    <button className="filter-button" onClick={toggleFilter}>
                      <Filter size={16} />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    DATE JOINED
                    <button className="filter-button" onClick={toggleFilter}>
                      <Filter size={16} />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    STATUS
                    <button className="filter-button" onClick={toggleFilter}>
                      <Filter size={16} />
                    </button>
                  </div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.organization}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.dateJoined}</td>
                    <td>
                      <span className={`status ${getStatusClass(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <div className="actions-container">
                        <button
                          className="action-button"
                          onClick={() => toggleActionMenu(user.id)}
                        >
                          <MoreVertical size={16} />
                        </button>

                        {showActionMenu === user.id && (
                          <div className="action-menu">
                            <Link
                              to={`/users/${user.id}`}
                              className="action-item"
                            >
                              <Eye size={16} />
                              <span>View Details</span>
                            </Link>
                            <button className="action-item">
                              <UserX size={16} />
                              <span>Blacklist User</span>
                            </button>
                            <button className="action-item">
                              <UserPlus size={16} />
                              <span>Activate User</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="no-data">
                    No users found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showFilter && (
          <div className="filter-form">
            <div className="form-group">
              <label>Organization</label>
              <select
                name="organization"
                value={filters.organization}
                onChange={handleFilterChange}
                disabled={isFieldDisabled("organization")}
              >
                <option value="">Select</option>
                <option value="lendsqr">Lendsqr</option>
                <option value="TeamApt">TeamApt</option>
                <option value="Carbon">Carbon</option>
                <option value="Flutterwave">Flutterwave</option>
                <option value="Kuda">Kuda</option>
                <option value="Paystack">Paystack</option>
                <option value="Moniepoint">Moniepoint</option>
              </select>
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="User"
                name="username"
                value={filters.username}
                onChange={handleFilterChange}
                disabled={isFieldDisabled("username")}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={filters.email}
                onChange={handleFilterChange}
                disabled={isFieldDisabled("email")}
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                disabled={isFieldDisabled("date")}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                value={filters.phoneNumber}
                onChange={handleFilterChange}
                disabled={isFieldDisabled("phoneNumber")}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                disabled={isFieldDisabled("status")}
              >
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="blacklisted">Blacklisted</option>
              </select>
            </div>

            <div className="filter-actions">
              <button className="btn btn-outline" onClick={resetFilters}>
                Reset
              </button>
              <button className="btn btn-primary" onClick={applyFilters}>
                Filter
              </button>
            </div>
          </div>
        )}

        <div className="pagination">
          <div className="showing">
            Showing{" "}
            <select
              value={usersPerPage}
              onChange={(e) => {
                const newValue = Number.parseInt(e.target.value);
                setUsersPerPage(newValue);
                setCurrentPage(1);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>{" "}
            out of {filteredUsers.length}
          </div>

          <div className="page-numbers">
            <button
              className="page-arrow prev"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  className={`page-number ${
                    currentPage === pageNum ? "active" : ""
                  }`}
                  onClick={() => paginate(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span>...</span>
                <button
                  className="page-number"
                  onClick={() => paginate(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              className="page-arrow next"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
