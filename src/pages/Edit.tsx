import styled from "@emotion/styled";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createCard, editCard, getCard } from "../apis";
import Button from "../components/common/Button";
import DropDown from "../components/common/DropDown";
import Input from "../components/common/Input";
import MobileTemplate from "../components/common/MobileTemplate";
import RadioGroup from "../components/common/RadioGroup";
import { colors } from "../design-token";
import { ReactComponent as UploadIcon } from "../static/svg/uploadIcon.svg";

const Edit = () => {
  const navigate = useNavigate();
  const { cardId } = useParams();
  const [page, setPage] = useState<number>(0);
  const [file, setFile] = useState<File>();
  const [value, setValue] = useState({
    name: "",
    gender: "",
    job: "",
    email: "",
    password: "",
    passwordConfirm: "",
    birthDate: "",
    likeFood: "",
    github: "",
    bio: "",
    mbti: "",
    likeSeason: "",
    linkedIn: "",
  });

  useEffect(() => {
    cardId &&
      getCard(parseInt(cardId)).then(({ data }) => {
        const cardItemsKeys = data.cardItems.map((item) => item.itemName);
        const cardItemsValues = data.cardItems.map((item) => item.value);
        let body = {
          name: data.name,
          gender: data.gender,
          job: data.profession,
          email: data.email,
          password: "",
          passwordConfirm: "",
          birthDate: "",
          likeFood: "",
          github: "",
          bio: "",
          mbti: "",
          likeSeason: "",
          linkedIn: "",
        };

        cardItemsKeys.forEach(
          (item, idx) => (body = { ...body, [item]: cardItemsValues[idx] })
        );
        setValue(body);
      });
  }, [cardId]);

  const {
    name,
    gender,
    job,
    email,
    password,
    passwordConfirm,
    bio,
    mbti,
    birthDate,
    github,
    likeFood,
    likeSeason,
    linkedIn,
  } = value;

  const isFullField =
    name &&
    gender &&
    job &&
    email &&
    password &&
    password === passwordConfirm &&
    true;
  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.set("name", name);
    formData.set("gender", gender);
    formData.set("email", email);
    formData.set("profession", job);
    formData.set("password", password);
    file && formData.append("image", file);
    try {
      cardId &&
        (await editCard(parseInt(cardId), {
          name: name,
          gender: gender,
          email: email,
          profession: job,
          password: password,
          cardItems: [
            {
              itemId: 1,
              value: mbti,
            },
            {
              itemId: 3,
              value: bio,
            },
            {
              itemId: 4,
              value: likeSeason,
            },
            {
              itemId: 5,
              value: likeFood,
            },
            {
              itemId: 6,
              value: birthDate,
            },
            {
              itemId: 7,
              value: github,
            },
            {
              itemId: 8,
              value: linkedIn,
            },
          ],
        }));
      navigate(`/profile/${cardId}`);
    } catch (e: any) {
      alert(e.response.data.message);
      setPage(0);
    }
  };

  return (
    <MobileTemplate>
      <CreateStyle>
        <div className="title">
          {page === 0 ? (
            <>
              ????????? ?????? ????????? ??????
              <br /> ??? ??????????????????!
            </>
          ) : (
            <>
              ???????????? ?????? ?????????
              <br /> ???????????? ??????????????????!
              <div className="description">
                ????????? ????????? ?????? ????????? ???????????????
                <br /> ????????? ??????????????? ??????!
              </div>
            </>
          )}
        </div>
        <div className="content">
          {page === 0 ? (
            <>
              <div className="profile-upload">
                <div className="left">
                  <div className="title">????????? ?????? ?????????</div>
                  <div className="description">
                    ????????? ????????? ?????? ???????????? ???????????????!
                  </div>
                </div>
                <label className="upload-button">
                  <input
                    type="file"
                    onChange={(e) =>
                      e.target.files && setFile(e.target.files[0])
                    }
                  ></input>
                  <UploadIcon />
                </label>
              </div>
              <Input
                value={name}
                title="??????"
                placeholder="????????? ??????????????????."
                name="name"
                onChange={onChangeHandler}
              />
              <DropDown
                onChange={onChangeHandler as any}
                title="??????"
                name="gender"
                placeholder="????????? ???????????????."
                items={["???", "???"]}
              ></DropDown>

              <Input
                value={job}
                title="??????"
                placeholder="????????? ??????????????????. ex) Frontend Engineer"
                name="job"
                onChange={onChangeHandler}
              />
              <Input
                value={email}
                title="?????????"
                placeholder="???????????? ??????????????????."
                name="email"
                onChange={onChangeHandler}
              />
              <Input
                title="????????????"
                placeholder="??????????????? ??????????????????."
                value={password}
                name="password"
                onChange={onChangeHandler}
              ></Input>
              <Input
                title="???????????? ??????"
                placeholder="??????????????? ??????????????????."
                value={passwordConfirm}
                name="passwordConfirm"
                onChange={onChangeHandler}
              ></Input>
            </>
          ) : (
            <>
              <Input
                title="??? ??? ??????"
                value={bio}
                name="bio"
                placeholder="????????? ??? ??? ????????? ??????????????????."
                onChange={onChangeHandler}
              />
              <Input
                title="????????????"
                value={birthDate}
                name="birthDate"
                placeholder="ex) 2004.08.08"
                onChange={onChangeHandler}
              />
              <Input
                value={github}
                title="?????????"
                name="github"
                placeholder="????????? ???????????? ??????????????????. ex) eungyeole"
                onChange={onChangeHandler}
              />
              <Input
                title="????????????"
                name="linkedIn"
                placeholder="ex) https://www.linkedin.com/in/eungyeole/"
                value={linkedIn}
                onChange={onChangeHandler}
              />
              <DropDown
                onChange={onChangeHandler as any}
                title="MBTI"
                placeholder="MBTI??? ??????????????????."
                name="mbti"
                items={[
                  "ISTJ",
                  "ISFT",
                  "INFJ",
                  "INTJ",
                  "ISTP",
                  "ISFP",
                  "INFP",
                  "INTP",
                  "ESTP",
                  "ESFP",
                  "ENFP",
                  "ENTP",
                  "ESTJ",
                  "ESFJ",
                  "ENFJ",
                  "ENTJ",
                ]}
              ></DropDown>
              <RadioGroup
                title="???????????? ??????"
                items={["??????", "??????", "??????", "??????"]}
                name="likeFood"
                onChange={onChangeHandler as any}
              />

              <RadioGroup
                title="???????????? ??????"
                items={["???", "??????", "??????", "??????"]}
                name="likeSeason"
                onChange={onChangeHandler as any}
              />
            </>
          )}
        </div>
        <div className="bottomButton">
          <Button
            onClick={() => (page === 1 ? onSubmit() : setPage(1))}
            disabled={!(isFullField || false)}
          >
            {page === 0 ? "?????? ????????? ????????????" : "????????? ?????? ?????????"}
          </Button>
        </div>
      </CreateStyle>
    </MobileTemplate>
  );
};

export default Edit;

const CreateStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  & .bottomButton {
    position: fixed;
    bottom: 0;
    max-width: 710px;
    width: 100%;
    padding: 0 28px;
    padding-bottom: 28px;
    box-sizing: border-box;
    background-color: white;
  }
  & .profile-upload {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & .left {
      & > .title {
        color: ${colors.title};
        font-weight: 700;
        font-size: 16px;
      }
      & > .description {
        color: ${colors.description};
        font-weight: 400;
        font-size: 12px;
      }
    }
    & .upload-button {
      & input {
        display: none;
      }
      width: 44px;
      height: 44px;
      background-color: ${colors.icon};
      border: none;
      cursor: pointer;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  & > .title {
    color: ${colors.title};
    font-weight: 700;
    font-size: 20px;
    padding: 32px 28px;
    & .description {
      color: ${colors.description};
      font-weight: 400;
      font-size: 12px;
      margin-top: 8px;
    }
  }
  & .content {
    padding: 0 28px;
    padding-top: 40px;
    padding-bottom: 112px;
    flex: 1;
    background-color: white;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
`;
