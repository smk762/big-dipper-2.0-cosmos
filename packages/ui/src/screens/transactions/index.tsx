import { NextSeo } from 'next-seo';
import useAppTranslation from '@/hooks/useAppTranslation';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import Box from '@/components/box';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import TransactionsList from '@/components/transactions_list';
import TransactionsListDetails from '@/components/transactions_list_details';
import { readTx } from '@/recoil/settings';
import { writeFilter, writeSelectedMsgTypes } from '@/recoil/transactions_filter';
import { useTransactions } from '@/screens/transactions/hooks';
import useStyles from '@/screens/transactions/styles';
import { useEffect } from 'react';

const Transactions = () => {
  const txListFormat = useRecoilValue(readTx);
  const { t } = useAppTranslation('transactions');
  const { classes } = useStyles();
  const { state, loadNextPage } = useTransactions();
  const loadMoreItems = state.isNextPageLoading ? () => null : loadNextPage;
  const isItemLoaded = (index: number) => !state.hasNextPage || index < state.items.length;
  const itemCount = state.hasNextPage ? state.items.length + 1 : state.items.length;
  const [, setMsgTypes] = useRecoilState(writeFilter) as [string, SetterOrUpdater<string>];
  const [, setSelectedMsgs] = useRecoilState(writeSelectedMsgTypes) as [
    string[],
    SetterOrUpdater<string[]>
  ];
  useEffect(() => {
    setMsgTypes('{}');
    setSelectedMsgs([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NextSeo
        title={t('transactions') ?? undefined}
        openGraph={{
          title: t('transactions') ?? undefined,
        }}
      />
      <Layout navTitle={t('transactions') ?? undefined} className={classes.root}>
        <LoadAndExist exists={state.exists} loading={state.loading}>
          <Box className={classes.box}>
            {txListFormat === 'compact' ? (
              <TransactionsList
                transactions={state.items}
                itemCount={itemCount}
                hasNextPage={state.hasNextPage}
                isNextPageLoading={state.isNextPageLoading}
                loadNextPage={loadNextPage}
                loadMoreItems={loadMoreItems}
                isItemLoaded={isItemLoaded}
              />
            ) : (
              <TransactionsListDetails
                transactions={state.items}
                itemCount={itemCount}
                hasNextPage={state.hasNextPage}
                isNextPageLoading={state.isNextPageLoading}
                loadNextPage={loadNextPage}
                loadMoreItems={loadMoreItems}
                isItemLoaded={isItemLoaded}
              />
            )}
          </Box>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default Transactions;
