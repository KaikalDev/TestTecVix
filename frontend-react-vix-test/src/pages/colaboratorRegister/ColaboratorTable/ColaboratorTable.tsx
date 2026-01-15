import { Fragment, useEffect, useState } from "react";
import { useZTheme } from "../../../stores/useZTheme";
import { Box, IconButton, Modal, Stack } from "@mui/material";
import { ImgFromDB } from "../../../components/ImgFromDB";
import { TextRob14Font1Xs } from "../../../components/Text1Xs";
import { TextRob12Font2Xs } from "../../../components/Text2Xs";
import { useTranslation } from "react-i18next";
import { PencilCicleIcon } from "../../../icons/PencilCicleIcon";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useZUserProfile } from "../../../stores/useZUserProfile";
import moment from "moment";
import { useZColaboratorRegister } from "../../../stores/useZColaboratorRegister";
import { useListUsers } from "../../../hooks/useListUsers";
import { ModalDeleteMsp } from "../../MSPRegister/ModalDeleteMsp";
import { ModalDelete } from "../ModalDelete";
import { IUserResponse } from "../../../types/userTypes";
import { useUserResources } from "../../../hooks/useUserResources";

export const ColaboratorTable = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(null);
  const { fetchListUsers, userList } = useListUsers();
  const {
    setColaboratorName,
    setEmail,
    setPhone,
    setUsername,
    setPosition,
    setDepartment,
    setPermission,
    setHiringDate,
    setStatus,
    setIdBrandMaster,
    setIsEditing,
    colaboratorNameFilter,
    companyNameFilter,
    isEditing,
  } = useZColaboratorRegister();

  useEffect(() => {
    fetchListUsers();
  }, []);

  const { role } = useZUserProfile();

  const handleEdit = (user: IUserResponse) => {
    setColaboratorName(user.fullName || "");
    setEmail(user.email || "");
    setPhone(user.userPhoneNumber || "");
    setUsername(user.username || "");
    setPosition(user.field || "");
    setDepartment(user.department || "");
    setPermission(user.role || "member");
    setHiringDate(
      user.contractDate ? moment(user.contractDate).format("YYYY-MM-DD") : "",
    );
    setStatus(user.isActive ? "active" : "inactive");
    setIdBrandMaster(user.idBrandMaster || null);
    setIsEditing([Number(user.idUser)]);
  };
  return (
    <Stack
      sx={{
        width: "100%",
        maxHeight: "540px",
        overflow: "auto",
        gap: "16px",
      }}
    >
      {[...userList]
        .filter(
          (user) =>
            user.brandMaster?.brandName
              .toLowerCase()
              .includes(companyNameFilter.toLowerCase()) &&
            user.fullName &&
            user.fullName
              .toLowerCase()
              .includes(colaboratorNameFilter.toLowerCase()),
        )
        .map((user, index) => (
          <Fragment
            key={`${user.idBrandMaster}-${user.brandMaster?.brandName}`}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 4px",
                gap: "16px",
                "@media (max-width: 800px)": {
                  flexDirection: "column",
                  alignItems: "flex-start",
                },
              }}
            >
              <Box
                sx={{
                  flex: "2",
                  display: "flex",
                  flexDirection: "row",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <ImgFromDB
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "100%",
                  }}
                  alt="msp image"
                  src={
                    user.brandMaster?.brandLogo ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGHdcalX0wUWxZQCiSv8WzmSPpFGHr4jlsw&s"
                  }
                />
                <Stack>
                  <TextRob14Font1Xs
                    sx={{
                      color: theme[mode].black,
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {user.fullName}
                  </TextRob14Font1Xs>
                  <TextRob12Font2Xs
                    sx={{
                      color: theme[mode].gray,
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    {user.email || ""}
                  </TextRob12Font2Xs>
                </Stack>
              </Box>

              {/* Status */}
              <Box
                sx={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  "@media (max-width: 900px)": { display: "none" },
                }}
              >
                <TextRob14Font1Xs
                  sx={{
                    color: theme[mode].black,
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {t("colaboratorRegister.status")}
                </TextRob14Font1Xs>
                <TextRob12Font2Xs
                  sx={{
                    color: theme[mode].gray,
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  {t("colaboratorRegister.lastActivity") + " "}
                  {user.lastLoginDate || ""}
                </TextRob12Font2Xs>
              </Box>
              <Box
                sx={{
                  flex: "2",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <TextRob14Font1Xs
                  sx={{
                    boxSizing: "content-box",
                    padding: "0 10px",
                    fontWeight: "400",
                    borderRadius: "12px",
                    border: `1px solid ${theme[mode].blueDark}`,
                    color: theme[mode].blueDark,
                    maxWidth: "120px",
                    overflow: "hidden",
                    textWrap: "nowrap",
                    textOverflow: "ellipsis",
                    "&:hover": {
                      cursor: "pointer",
                      background: theme[mode].blueDark,
                      color: theme[mode].mainBackground,
                    },
                  }}
                >
                  {user.brandMaster?.brandName}
                </TextRob14Font1Xs>
                <TextRob14Font1Xs
                  sx={{
                    boxSizing: "content-box",
                    padding: "0 10px",
                    fontWeight: "400",
                    borderRadius: "12px",
                    border: `1px solid ${theme[mode].blueDark}`,
                    color: theme[mode].blueDark,
                    maxWidth: "120px",
                    overflow: "hidden",
                    textWrap: "nowrap",
                    textOverflow: "ellipsis",
                    "&:hover": {
                      cursor: "pointer",
                      background: theme[mode].blueDark,
                      color: theme[mode].mainBackground,
                    },
                  }}
                >
                  {t(`colaboratorRegister.${user.role}`)}
                </TextRob14Font1Xs>
                <TextRob14Font1Xs
                  sx={{
                    boxSizing: "content-box",
                    padding: "0 10px",
                    fontWeight: "400",
                    borderRadius: "12px",
                    border: `1px solid ${
                      user.isActive ? theme[mode].ok : theme[mode].danger
                    }`,
                    color: user.isActive ? theme[mode].ok : theme[mode].danger,
                  }}
                >
                  {t(
                    `colaboratorRegister.${user.isActive ? "active" : "inactive"}`,
                  )}
                </TextRob14Font1Xs>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  "@media (max-width: 600px)": { display: "none" },
                }}
              >
                <IconButton onClick={() => handleEdit(user)}>
                  {isEditing.includes(Number(user.idUser)) ? (
                    <CheckCircleOutlineRoundedIcon
                      sx={{
                        color: theme[mode].blueMedium,
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  ) : (
                    <PencilCicleIcon fill={theme[mode].blueMedium} />
                  )}
                </IconButton>
                {user.role !== "admin" && (
                  <IconButton
                    onClick={() => {
                      setModalOpen("deleted");
                    }}
                  >
                    <DeleteForeverIcon sx={{ color: theme[mode].danger }} />
                  </IconButton>
                )}
              </Box>
            </Box>
            {index !== userList.length - 1 && (
              <div
                key={`${user.idUser}-${user.brandMaster?.brandName}-divider`}
                style={{
                  height: "1px",
                  minHeight: "1px",
                  maxHeight: "1px",
                  width: "100%",
                  background: theme[mode].grayLight,
                }}
              />
            )}
            {modalOpen !== null && (
              <Modal
                open={modalOpen !== null}
                onClose={() => setModalOpen(null)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  {modalOpen === "deleted" && (
                    <ModalDelete
                      userToDelete={user}
                      onClose={() => {
                        setModalOpen(null);
                      }}
                    />
                  )}
                </div>
              </Modal>
            )}
          </Fragment>
        ))}
    </Stack>
  );
};
