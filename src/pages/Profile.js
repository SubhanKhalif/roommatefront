import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo";
import EditProfile from "../components/EditProfile";
import EditPassword from "../components/EditPassword";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setProfile(storedUser);
    }
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      {isEditing ? (
        <EditProfile profile={profile} setProfile={setProfile} setIsEditing={setIsEditing} />
      ) : isChangingPassword ? (
        <EditPassword email={profile.email} logout={logout} />
      ) : (
        <ProfileInfo setIsEditing={setIsEditing} setIsChangingPassword={setIsChangingPassword} />
      )}
    </div>
  );
};

export default Profile;