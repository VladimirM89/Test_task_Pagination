import Head from "next/head";
import {Inter} from "next/font/google";
import Table from "react-bootstrap/Table";
import {Alert, Container} from "react-bootstrap";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import PaginationComponent from "@/components/Pagination";
import { TGetServerSideProps } from "@/models/Response";
import { Methods, StatusCodes } from "@/constants/enums";
import { INCORRECT_PAGE_TEXT } from "@/constants/constants";

const inter = Inter({subsets: ["latin"]});

export const getServerSideProps = (async (ctx: GetServerSidePropsContext): Promise<{ props: TGetServerSideProps }> => {
  try {
    const { page } = ctx.query;
    const res = await fetch(`http://localhost:3000/users${page ? `?page=${page}` : ''}`, {method: Methods.GET})

    if (!res.ok) {
      return {props: {
        statusCode: res.status,
        response: {items: [], meta: null, links: null}
        }
      }
    }

    return {
      props: {statusCode: StatusCodes.OK, response: await res.json()}
    }
  } catch (e) {
    return {props: {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      response: {items: [], meta: null, links: null}
      }
    }
  }
}) satisfies GetServerSideProps<TGetServerSideProps>


export default function Home({statusCode, response}: TGetServerSideProps) {
  if (statusCode !== StatusCodes.OK) {
    return <Alert variant={'danger'}>Ошибка {statusCode} при загрузке данных</Alert>
  }

  return (
    <>
      <Head>
        <title>Тестовое задание</title>
        <meta name="description" content="Тестовое задание"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={inter.className}>
        <Container>
          <h1 className={'mb-5'}>Пользователи</h1>
          {response.items.length
            ? <Table striped bordered hover>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Телефон</th>
                  <th>Email</th>
                  <th>Дата обновления</th>
                </tr>
                </thead>
                <tbody>
                {
                  response.items.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td>{user.updatedAt}</td>
                    </tr>
                  ))
                }
                </tbody>
              </Table>
            : <p className={'mb-5'}>{INCORRECT_PAGE_TEXT}</p>
          }

          {(response.meta && response.links) &&
            <PaginationComponent
              metaInfo={response.meta}
              linksInfo={response.links}
            />
          }
        </Container>
      </main>
    </>
  );
}
